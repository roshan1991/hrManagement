import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Badge, Row, Col, InputGroup } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/team-meetings';

const TeamMeeting = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', meeting_date: '', meeting_time: '', link_location: '', status: 'Scheduled' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch team meetings.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({ title: '', description: '', meeting_date: '', meeting_time: '', link_location: '', status: 'Scheduled' });
    setEditingId(null);
  };
  
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchItems();
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save team meeting.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title || '',
      description: item.description || '',
      meeting_date: item.meeting_date ? new Date(item.meeting_date).toISOString().slice(0, 10) : '',
      meeting_time: item.meeting_time || '',
      link_location: item.link_location || '',
      status: item.status || 'Scheduled'
    });
    setEditingId(item.id);
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team meeting?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert('Failed to delete team meeting.');
      }
    }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const filtered = items.filter(i =>
    (`${i.title} ${i.description} ${i.link_location}`).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Team Meetings</h4>
          <p className="text-muted mb-0 small">Schedule and host company meetings</p>
        </div>
        <Button variant="primary" onClick={handleShow}>
          <i className="ti ti-plus me-1"></i>Schedule Meeting
        </Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="mb-3 g-2">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><i className="ti ti-search"></i></InputGroup.Text>
            <Form.Control placeholder="Search meetings..." value={search} onChange={e => setSearch(e.target.value)} />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Button variant="outline-secondary" className="w-100" onClick={() => setSearch('')}>
            <i className="ti ti-refresh me-1"></i>Reset
          </Button>
        </Col>
      </Row>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date & Time</th>
            <th>Location / Link</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <div className="fw-semibold">{item.title}</div>
                <small className="text-muted d-block text-truncate" style={{ maxWidth: '300px' }}>{item.description}</small>
              </td>
              <td>
                <div>{item.meeting_date ? new Date(item.meeting_date).toLocaleDateString() : '-'}</div>
                <small className="text-muted">{item.meeting_time || '-'}</small>
              </td>
              <td>
                {item.link_location && item.link_location.startsWith('http') ? (
                  <a href={item.link_location} target="_blank" rel="noreferrer" className="text-primary small">
                    <i className="ti ti-video me-1"></i>Join Meeting
                  </a>
                ) : <span>{item.link_location || '-'}</span>}
              </td>
              <td>
                <Badge bg={item.status === 'Completed' ? 'success' : item.status === 'Cancelled' ? 'danger' : 'primary'} className={`bg-label-${item.status === 'Completed' ? 'success' : item.status === 'Cancelled' ? 'danger' : 'primary'} text-${item.status === 'Completed' ? 'success' : item.status === 'Cancelled' ? 'danger' : 'primary'}`}>
                  {item.status}
                </Badge>
              </td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-2 text-primary" onClick={() => handleEdit(item)}>
                  <i className="ti ti-edit"></i>
                </Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}>
                  <i className="ti ti-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
          {!loading && filtered.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-muted">No meetings scheduled.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Meeting' : 'Schedule New Meeting'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Meeting Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control required value={formData.title} onChange={set('title')} placeholder="e.g. Weekly Standup / Product Review" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" required value={formData.meeting_date} onChange={set('meeting_date')} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="text" required value={formData.meeting_time} onChange={set('meeting_time')} placeholder="e.g. 10:00 AM - 11:00 AM" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Meeting Link / Location</Form.Label>
                  <Form.Control value={formData.link_location} onChange={set('link_location')} placeholder="e.g. https://meet.google.com/abc or Conference Room A" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select value={formData.status} onChange={set('status')}>
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Meeting Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={formData.description} onChange={set('description')} placeholder="Meeting notes, agenda, etc." />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Meeting</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamMeeting;
