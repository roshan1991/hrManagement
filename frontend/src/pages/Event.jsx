import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Badge, Row, Col, InputGroup } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/events';

const Event = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', event_date: '', event_time: '', venue: '', organizer: '' });
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
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({ title: '', description: '', event_date: '', event_time: '', venue: '', organizer: '' });
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
      alert('Failed to save event.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title || '',
      description: item.description || '',
      event_date: item.event_date ? new Date(item.event_date).toISOString().slice(0, 10) : '',
      event_time: item.event_time || '',
      venue: item.venue || '',
      organizer: item.organizer || ''
    });
    setEditingId(item.id);
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert('Failed to delete event.');
      }
    }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const filtered = items.filter(i =>
    (`${i.title} ${i.description} ${i.venue}`).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Company Events</h4>
          <p className="text-muted mb-0 small">Plan and manage company-wide events</p>
        </div>
        <Button variant="primary" onClick={handleShow}>
          <i className="ti ti-plus me-1"></i>Create Event
        </Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="mb-3 g-2">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><i className="ti ti-search"></i></InputGroup.Text>
            <Form.Control placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} />
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
            <th>Venue</th>
            <th>Organizer</th>
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
                <div>{item.event_date ? new Date(item.event_date).toLocaleDateString() : '-'}</div>
                <small className="text-muted">{item.event_time || '-'}</small>
              </td>
              <td>{item.venue || '-'}</td>
              <td>{item.organizer || '-'}</td>
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
              <td colSpan="6" className="text-center py-4 text-muted">No events planned.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Event' : 'Create New Event'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Event Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control required value={formData.title} onChange={set('title')} placeholder="e.g. Annual Sports Day / Tech Hackathon" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control type="date" required value={formData.event_date} onChange={set('event_date')} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Event Time</Form.Label>
                  <Form.Control type="text" required value={formData.event_time} onChange={set('event_time')} placeholder="e.g. 02:00 PM - 06:00 PM" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Venue / Location</Form.Label>
                  <Form.Control value={formData.venue} onChange={set('venue')} placeholder="e.g. Main Hall or City Ground" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Organizer</Form.Label>
                  <Form.Control value={formData.organizer} onChange={set('organizer')} placeholder="e.g. HR Team / Club Coordinator" />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Event Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={formData.description} onChange={set('description')} placeholder="Event agenda, requirements, details, etc." />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Create Event</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Event;
