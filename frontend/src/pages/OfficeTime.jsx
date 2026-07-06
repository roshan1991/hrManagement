import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, title: 'Morning Office Time', description: 'Standard morning shift for office employees', start_time: '09:00', end_time: '17:00', break_duration: 60, days: 'Mon-Fri', status: 'Active' },
  { id: 2, title: 'Evening Shift', description: 'Evening shift schedule', start_time: '14:00', end_time: '22:00', break_duration: 30, days: 'Mon-Sat', status: 'Active' },
  { id: 3, title: 'Remote Work Schedule', description: 'Flexible schedule for remote workers', start_time: '10:00', end_time: '18:00', break_duration: 60, days: 'Mon-Fri', status: 'Inactive' },
];

const emptyForm = { title: '', description: '', start_time: '09:00', end_time: '17:00', break_duration: '60', days: 'Mon-Fri', status: 'Active' };

const API_URL = 'http://localhost:5000/api/office-time';

const OfficeTime = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError('Failed to fetch records.');
    } finally {
      setLoading(false);
    }
  };
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const handleClose = () => { setShow(false); setFormData(emptyForm); setEditingId(null); };
  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

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
      alert('Failed to save record.');
    }
  };

  const handleEdit = (item) => { setFormData({ ...item }); setEditingId(item.id); setShow(true); };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert('Failed to delete record.');
      }
    }
  };

  const calcHours = (start, end, breakMin) => {
    if (!start || !end) return '-';
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const total = (eh * 60 + em) - (sh * 60 + sm) - (parseInt(breakMin) || 0);
    return `${Math.floor(total / 60)}h ${total % 60}m`;
  };

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Office Time</h4>
          <p className="text-muted mb-0 small">Define work schedules and shift timings</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-plus me-1"></i>Add Office Time</Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Schedule Name</th><th>Start Time</th><th>End Time</th><th>Break</th><th>Working Hours</th><th>Days</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <div className="fw-medium">{item.title}</div>
                <small className="text-muted">{item.description}</small>
              </td>
              <td><Badge bg="info" className="bg-label-info text-info">{item.start_time}</Badge></td>
              <td><Badge bg="warning" className="bg-label-warning text-warning">{item.end_time}</Badge></td>
              <td>{item.break_duration} min</td>
              <td className="fw-medium text-primary">{calcHours(item.start_time, item.end_time, item.break_duration)}</td>
              <td>{item.days}</td>
              <td><Badge bg={item.status === 'Active' ? 'success' : 'secondary'} className={`bg-label-${item.status === 'Active' ? 'success' : 'secondary'} text-${item.status === 'Active' ? 'success' : 'secondary'}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="9" className="text-center py-4 text-muted">No schedules found.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Schedule' : 'Add Office Time Schedule'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}><Form.Group><Form.Label>Schedule Name <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.title} onChange={set('title')} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Start Time</Form.Label><Form.Control type="time" value={formData.start_time} onChange={set('start_time')} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>End Time</Form.Label><Form.Control type="time" value={formData.end_time} onChange={set('end_time')} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Break Duration (min)</Form.Label><Form.Control type="number" value={formData.break_duration} onChange={set('break_duration')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Working Days</Form.Label><Form.Select value={formData.days} onChange={set('days')}><option>Mon-Fri</option><option>Mon-Sat</option><option>Mon-Sun</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Active</option><option>Inactive</option></Form.Select></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={2} value={formData.description} onChange={set('description')} /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Schedule</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default OfficeTime;
