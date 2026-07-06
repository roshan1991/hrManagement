import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, applicant: 'Ramesh Joshi', position: 'Accountant', department: 'Finance', interviewer: 'Amit Poudel', interview_date: '2025-05-28', feedback: 'Strong analytical skills, good communication', result: 'Selected', status: 'Completed' },
  { id: 2, applicant: 'Deepa Shrestha', position: 'Marketing Lead', department: 'Marketing', interviewer: 'Sunita Gurung', interview_date: '2025-05-27', feedback: 'Lacks experience in digital marketing', result: 'Rejected', status: 'Completed' },
  { id: 3, applicant: 'Anita Rai', position: 'HR Executive', department: 'HR', interviewer: 'Priya Thapa', interview_date: '2025-06-02', feedback: '', result: 'Pending', status: 'Scheduled' },
];

const statusColor = { Scheduled: 'primary', Completed: 'success', Cancelled: 'secondary' };
const resultColor = { Selected: 'success', Rejected: 'danger', 'On Hold': 'warning', Pending: 'secondary' };
const emptyForm = { applicant: '', position: '', department: '', interviewer: '', interview_date: '', feedback: '', result: 'Pending', status: 'Scheduled' };

const API_URL = 'http://localhost:5000/api/feedback';

const Feedback = () => {
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
          <h4 className="fw-bold mb-1">Interview Feedback</h4>
          <p className="text-muted mb-0 small">Record and manage interview feedback for candidates</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-plus me-1"></i>Add Feedback</Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Applicant</th><th>Position</th><th>Interviewer</th><th>Date</th><th>Feedback</th><th>Result</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td className="fw-medium">{item.applicant}</td>
              <td>
                <div>{item.position}</div>
                <small className="text-muted">{item.department}</small>
              </td>
              <td>{item.interviewer}</td>
              <td>{item.interview_date}</td>
              <td><small className="text-muted">{item.feedback || '—'}</small></td>
              <td><Badge bg={resultColor[item.result]} className={`bg-label-${resultColor[item.result]} text-${resultColor[item.result]}`}>{item.result}</Badge></td>
              <td><Badge bg={statusColor[item.status]} className={`bg-label-${statusColor[item.status]} text-${statusColor[item.status]}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="9" className="text-center py-4 text-muted">No feedback records found.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Feedback' : 'Add Interview Feedback'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}><Form.Group><Form.Label>Applicant Name <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.applicant} onChange={set('applicant')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Position</Form.Label><Form.Control value={formData.position} onChange={set('position')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Interviewer</Form.Label><Form.Control value={formData.interviewer} onChange={set('interviewer')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Interview Date</Form.Label><Form.Control type="date" value={formData.interview_date} onChange={set('interview_date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Scheduled</option><option>Completed</option><option>Cancelled</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Result</Form.Label><Form.Select value={formData.result} onChange={set('result')}><option>Pending</option><option>Selected</option><option>Rejected</option><option>On Hold</option></Form.Select></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Feedback</Form.Label><Form.Control as="textarea" rows={4} value={formData.feedback} onChange={set('feedback')} placeholder="Enter detailed interview feedback..." /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Update</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Feedback;
