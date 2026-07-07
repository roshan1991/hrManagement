import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table } from 'react-bootstrap';
import { useEmployees } from '../hooks/useEmployees';

const SAMPLE = [
  { id: 1, title: 'Pending Leave Settlement', description: 'Settlement for annual leave balance payout', employee: 'Rajesh Sharma', amount: 25000, request_date: '2025-06-01', status: 'Pending' },
  { id: 2, title: 'Loan Settlement Request', description: 'Early settlement of personal loan', employee: 'Priya Thapa', amount: 85000, request_date: '2025-05-28', status: 'Approved' },
];

const emptyForm = { title: '', description: '', employee: '', amount: '', request_date: '', status: 'Pending' };
const statusColor = { Pending: 'warning', Approved: 'success', Rejected: 'danger' };

const API_URL = 'http://localhost:5000/api/settlement-request-list';

const SettlementRequestList = () => {
  const { employees } = useEmployees();
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
          <h4 className="fw-bold mb-1">Settlement Requests</h4>
          <p className="text-muted mb-0 small">Manage loan and leave settlement requests</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-plus me-1"></i>Add Settlement Request</Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Title</th><th>Employee</th><th>Amount (Rs.)</th><th>Request Date</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <div className="fw-medium">{item.title}</div>
                <small className="text-muted">{item.description}</small>
              </td>
              <td>{item.employee}</td>
              <td className="fw-medium">Rs. {Number(item.amount).toLocaleString()}</td>
              <td>{item.request_date}</td>
              <td><Badge bg={statusColor[item.status]} className={`bg-label-${statusColor[item.status]} text-${statusColor[item.status]}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="7" className="text-center py-4 text-muted">No settlement requests.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Request' : 'Add Loan Settlement Request'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}><Form.Group><Form.Label>Title <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.title} onChange={set('title')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Employee</Form.Label><Form.Select value={formData.employee} onChange={set('employee')}><option value="">Select Employee</option>{employees.map(e => <option key={e}>{e}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Amount (Rs.) <span className="text-danger">*</span></Form.Label><Form.Control type="number" required value={formData.amount} onChange={set('amount')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Request Date</Form.Label><Form.Control type="date" value={formData.request_date} onChange={set('request_date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Pending</option><option>Approved</option><option>Rejected</option></Form.Select></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} value={formData.description} onChange={set('description')} /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default SettlementRequestList;
