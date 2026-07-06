import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, title: 'System Downtime Complaint', employee: 'Rajesh Sharma', department: 'Engineering', date: '2025-05-20', priority: 'High', category: 'Technical', status: 'Open', description: 'The development server is frequently going down during peak hours.' },
  { id: 2, title: 'Salary Discrepancy', employee: 'Priya Thapa', department: 'HR', date: '2025-05-22', priority: 'Medium', category: 'Payroll', status: 'In Progress', description: 'Overtime pay not reflected in last month salary.' },
  { id: 3, title: 'Office Facilities Issue', employee: 'Amit Poudel', department: 'Finance', date: '2025-05-25', priority: 'Low', category: 'Facilities', status: 'Resolved', description: 'Air conditioning not working in the finance department.' },
];

const EMPLOYEES = ['Rajesh Sharma', 'Priya Thapa', 'Amit Poudel', 'Sunita Gurung', 'Bikash Rai'];
const CATEGORIES = ['Technical', 'Payroll', 'Facilities', 'HR Policy', 'Management', 'Other'];
const statusColor = { Open: 'danger', 'In Progress': 'warning', Resolved: 'success' };
const priorityColor = { Low: 'info', Medium: 'warning', High: 'danger' };

const emptyForm = { title: '', employee: '', department: '', date: '', priority: 'Medium', category: '', status: 'Open', description: '' };

const API_URL = 'http://localhost:5000/api/complaint';

const Complaint = () => {
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

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Complaints</h4>
          <p className="text-muted mb-0 small">Track and resolve employee complaints</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-plus me-1"></i>File Complaint</Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Title</th><th>Employee</th><th>Category</th><th>Date</th><th>Priority</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <div className="fw-medium">{item.title}</div>
                <small className="text-muted">{item.description?.substring(0, 50)}...</small>
              </td>
              <td>
                <div>{item.employee}</div>
                <small className="text-muted">{item.department}</small>
              </td>
              <td>{item.category}</td>
              <td>{item.date}</td>
              <td><Badge bg={priorityColor[item.priority]} className={`bg-label-${priorityColor[item.priority]} text-${priorityColor[item.priority]}`}>{item.priority}</Badge></td>
              <td><Badge bg={statusColor[item.status]} className={`bg-label-${statusColor[item.status]} text-${statusColor[item.status]}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="8" className="text-center py-4 text-muted">No complaints found.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Complaint' : 'File New Complaint'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}><Form.Group><Form.Label>Complaint Title <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.title} onChange={set('title')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Employee</Form.Label><Form.Select value={formData.employee} onChange={set('employee')}><option value="">Select Employee</option>{EMPLOYEES.map(e => <option key={e}>{e}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Category</Form.Label><Form.Select value={formData.category} onChange={set('category')}><option value="">Select Category</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</Form.Select></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Date</Form.Label><Form.Control type="date" value={formData.date} onChange={set('date')} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Priority</Form.Label><Form.Select value={formData.priority} onChange={set('priority')}><option>Low</option><option>Medium</option><option>High</option></Form.Select></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Open</option><option>In Progress</option><option>Resolved</option></Form.Select></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Description <span className="text-danger">*</span></Form.Label><Form.Control as="textarea" rows={4} required value={formData.description} onChange={set('description')} /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Submit Complaint</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Complaint;
