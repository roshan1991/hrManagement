import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Badge, Row, Col, InputGroup } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/notices';
const DEPARTMENTS = ['All Departments', 'Engineering', 'HR', 'Finance', 'Marketing', 'Operations'];

const Notice = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', published_date: '', target_department: 'All Departments', status: 'Published' });
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
      setError('Failed to fetch notices.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({ title: '', content: '', published_date: '', target_department: 'All Departments', status: 'Published' });
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
      alert('Failed to save notice.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title || '',
      content: item.content || '',
      published_date: item.published_date ? new Date(item.published_date).toISOString().slice(0, 10) : '',
      target_department: item.target_department || 'All Departments',
      status: item.status || 'Published'
    });
    setEditingId(item.id);
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert('Failed to delete notice.');
      }
    }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const filtered = items.filter(i =>
    (`${i.title} ${i.content} ${i.target_department}`).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Company Notices</h4>
          <p className="text-muted mb-0 small">Publish notices and announcements for employees</p>
        </div>
        <Button variant="primary" onClick={handleShow}>
          <i className="ti ti-plus me-1"></i>Publish Notice
        </Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="mb-3 g-2">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><i className="ti ti-search"></i></InputGroup.Text>
            <Form.Control placeholder="Search notices..." value={search} onChange={e => setSearch(e.target.value)} />
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
            <th>Target Dept</th>
            <th>Date Published</th>
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
                <small className="text-muted d-block text-truncate" style={{ maxWidth: '300px' }}>{item.content}</small>
              </td>
              <td><Badge bg="info" className="bg-label-info text-info">{item.target_department}</Badge></td>
              <td>{item.published_date ? new Date(item.published_date).toLocaleDateString() : '-'}</td>
              <td>
                <Badge bg={item.status === 'Published' ? 'success' : 'secondary'} className={`bg-label-${item.status === 'Published' ? 'success' : 'secondary'} text-${item.status === 'Published' ? 'success' : 'secondary'}`}>
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
              <td colSpan="6" className="text-center py-4 text-muted">No notices found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Notice' : 'Publish New Notice'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Notice Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control required value={formData.title} onChange={set('title')} placeholder="e.g. Office Holiday Notice" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Target Department</Form.Label>
                  <Form.Select value={formData.target_department} onChange={set('target_department')}>
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Publish Date</Form.Label>
                  <Form.Control type="date" value={formData.published_date} onChange={set('published_date')} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select value={formData.status} onChange={set('status')}>
                    <option>Published</option>
                    <option>Draft</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Notice Content</Form.Label>
                  <Form.Control as="textarea" rows={4} value={formData.content} onChange={set('content')} placeholder="Type the notice detail here..." />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Notice;
