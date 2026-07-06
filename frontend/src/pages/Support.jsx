import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Badge, Row, Col, InputGroup } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/supports';

const Support = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ subject: '', employee_name: '', query_message: '', reply_message: '', priority: 'Medium', status: 'Pending' });
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
      setError('Failed to fetch support queries.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({ subject: '', employee_name: '', query_message: '', reply_message: '', priority: 'Medium', status: 'Pending' });
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
      alert('Failed to save support query.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      subject: item.subject || '',
      employee_name: item.employee_name || '',
      query_message: item.query_message || '',
      reply_message: item.reply_message || '',
      priority: item.priority || 'Medium',
      status: item.status || 'Pending'
    });
    setEditingId(item.id);
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this support ticket?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert('Failed to delete support ticket.');
      }
    }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const filtered = items.filter(i =>
    (`${i.subject} ${i.employee_name} ${i.query_message}`).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Support Tickets</h4>
          <p className="text-muted mb-0 small">Manage and reply to employee support queries</p>
        </div>
        <Button variant="primary" onClick={handleShow}>
          <i className="ti ti-plus me-1"></i>New Ticket
        </Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="mb-3 g-2">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><i className="ti ti-search"></i></InputGroup.Text>
            <Form.Control placeholder="Search tickets..." value={search} onChange={e => setSearch(e.target.value)} />
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
            <th>Employee</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td className="fw-medium">{item.employee_name || '-'}</td>
              <td>
                <div className="fw-semibold">{item.subject}</div>
                <small className="text-muted d-block text-truncate" style={{ maxWidth: '350px' }}>{item.query_message}</small>
                {item.reply_message && <small className="text-success d-block"><i className="ti ti-corner-down-right me-1"></i>Reply: {item.reply_message}</small>}
              </td>
              <td>
                <Badge bg={item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'secondary'} className={`bg-label-${item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'secondary'} text-${item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'secondary'}`}>
                  {item.priority}
                </Badge>
              </td>
              <td>
                <Badge bg={item.status === 'Resolved' ? 'success' : 'warning'} className={`bg-label-${item.status === 'Resolved' ? 'success' : 'warning'} text-${item.status === 'Resolved' ? 'success' : 'warning'}`}>
                  {item.status}
                </Badge>
              </td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-2 text-primary" onClick={() => handleEdit(item)} title="Reply / Edit">
                  <i className="ti ti-message-2"></i>
                </Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}>
                  <i className="ti ti-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
          {!loading && filtered.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-muted">No support tickets found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Resolve Ticket / Reply' : 'Open New Ticket'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Employee Name <span className="text-danger">*</span></Form.Label>
                  <Form.Control required value={formData.employee_name} onChange={set('employee_name')} placeholder="e.g. John Doe" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ticket Subject <span className="text-danger">*</span></Form.Label>
                  <Form.Control required value={formData.subject} onChange={set('subject')} placeholder="e.g. Payslip error / Log in issue" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Priority</Form.Label>
                  <Form.Select value={formData.priority} onChange={set('priority')}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select value={formData.status} onChange={set('status')}>
                    <option>Pending</option>
                    <option>Resolved</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Query Message</Form.Label>
                  <Form.Control as="textarea" rows={3} value={formData.query_message} onChange={set('query_message')} placeholder="Explain the support issue..." />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Support Reply / Resolution Note</Form.Label>
                  <Form.Control as="textarea" rows={3} value={formData.reply_message} onChange={set('reply_message')} placeholder="Type reply message to resolve query..." />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Submit Ticket</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Support;
