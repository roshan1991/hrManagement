import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table, InputGroup } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, applicant: 'Sanjay Kumar', job: 'Senior Developer', department: 'Engineering', date: '2025-05-28', time: '10:00 AM', interviewer: 'Rajesh Sharma', mode: 'In-Person', status: 'Scheduled', result: '' },
  { id: 2, applicant: 'Anita Rai', job: 'HR Executive', department: 'HR', date: '2025-05-29', time: '02:00 PM', interviewer: 'Priya Thapa', mode: 'Video Call', status: 'Completed', result: 'Selected' },
  { id: 3, applicant: 'Ramesh Joshi', job: 'Accountant', department: 'Finance', date: '2025-06-02', time: '11:00 AM', interviewer: 'Amit Poudel', mode: 'Phone', status: 'Scheduled', result: '' },
  { id: 4, applicant: 'Deepa Shrestha', job: 'Marketing Lead', department: 'Marketing', date: '2025-05-27', time: '03:00 PM', interviewer: 'Sunita Gurung', mode: 'In-Person', status: 'Completed', result: 'Rejected' },
];

const JOBS = ['Senior Developer', 'HR Executive', 'Accountant', 'Marketing Lead', 'Sales Executive'];
const INTERVIEWERS = ['Rajesh Sharma', 'Priya Thapa', 'Amit Poudel', 'Sunita Gurung'];
const statusColor = { Scheduled: 'primary', Completed: 'success', Cancelled: 'secondary' };
const resultColor = { Selected: 'success', Rejected: 'danger', 'On Hold': 'warning', '': 'light' };

const emptyForm = { applicant: '', job: '', department: '', date: '', time: '', interviewer: '', mode: 'In-Person', status: 'Scheduled', result: '' };

const API_URL = 'http://localhost:5000/api/interview';

const Interview = () => {
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
  const updateStatus = (id, status) => setItems(items.map(i => i.id === id ? { ...i, status } : i));

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Interviews</h4>
          <p className="text-muted mb-0 small">Schedule and track candidate interviews</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-plus me-1"></i>Schedule Interview</Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Applicant</th><th>Job Position</th><th>Date & Time</th><th>Interviewer</th><th>Mode</th><th>Status</th><th>Result</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td className="fw-medium">{item.applicant}</td>
              <td>
                <div>{item.job}</div>
                <small className="text-muted">{item.department}</small>
              </td>
              <td>
                <div>{item.date}</div>
                <small className="text-muted">{item.time}</small>
              </td>
              <td>{item.interviewer}</td>
              <td>
                <Badge bg="secondary" className="bg-label-secondary text-secondary">{item.mode}</Badge>
              </td>
              <td><Badge bg={statusColor[item.status]} className={`bg-label-${statusColor[item.status]} text-${statusColor[item.status]}`}>{item.status}</Badge></td>
              <td>
                {item.result ? (
                  <Badge bg={resultColor[item.result]} className={`bg-label-${resultColor[item.result]} text-${resultColor[item.result]}`}>{item.result}</Badge>
                ) : <span className="text-muted small">—</span>}
              </td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="9" className="text-center py-4 text-muted">No interviews scheduled.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Interview' : 'Schedule Interview'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}><Form.Group><Form.Label>Applicant Name <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.applicant} onChange={set('applicant')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Job Position</Form.Label><Form.Select value={formData.job} onChange={set('job')}><option value="">Select Position</option>{JOBS.map(j => <option key={j}>{j}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Date</Form.Label><Form.Control type="date" value={formData.date} onChange={set('date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Time</Form.Label><Form.Control type="time" value={formData.time} onChange={set('time')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Interviewer</Form.Label><Form.Select value={formData.interviewer} onChange={set('interviewer')}><option value="">Select Interviewer</option>{INTERVIEWERS.map(i => <option key={i}>{i}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Interview Mode</Form.Label><Form.Select value={formData.mode} onChange={set('mode')}><option>In-Person</option><option>Video Call</option><option>Phone</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Scheduled</option><option>Completed</option><option>Cancelled</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Result</Form.Label><Form.Select value={formData.result} onChange={set('result')}><option value="">Pending</option><option>Selected</option><option>Rejected</option><option>On Hold</option></Form.Select></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Interview</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Interview;
