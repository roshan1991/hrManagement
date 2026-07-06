import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, applicant: 'Sanjay Kumar', position: 'Senior Developer', department: 'Engineering', offer_date: '2025-06-01', join_date: '2025-07-01', status: 'Accepted', notes: '' },
  { id: 2, applicant: 'Anita Rai', position: 'HR Executive', department: 'HR', offer_date: '2025-05-30', join_date: '2025-06-15', status: 'Pending', notes: 'Waiting for confirmation' },
];

const EMPLOYEES = ['Rajesh Sharma', 'Priya Thapa', 'Amit Poudel', 'Sunita Gurung'];
const statusColor = { Pending: 'warning', Accepted: 'success', Rejected: 'danger', Joined: 'info' };

const emptyForm = { applicant: '', position: '', department: '', offer_date: '', join_date: '', status: 'Pending', notes: '' };

const API_URL = 'http://localhost:5000/api/onboard';

const Onboard = () => {
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
          <h4 className="fw-bold mb-1">Onboarding</h4>
          <p className="text-muted mb-0 small">Manage new hire onboarding process</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-user-plus me-1"></i>Add Onboard</Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Candidate</th><th>Position</th><th>Department</th><th>Offer Date</th><th>Join Date</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td className="fw-medium">{item.applicant}</td>
              <td>{item.position}</td>
              <td>{item.department}</td>
              <td>{item.offer_date}</td>
              <td>{item.join_date}</td>
              <td><Badge bg={statusColor[item.status]} className={`bg-label-${statusColor[item.status]} text-${statusColor[item.status]}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="8" className="text-center py-4 text-muted">No onboarding records found.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Onboarding' : 'Add Onboarding Record'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}><Form.Group><Form.Label>Candidate Name <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.applicant} onChange={set('applicant')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Position</Form.Label><Form.Control value={formData.position} onChange={set('position')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Department</Form.Label><Form.Control value={formData.department} onChange={set('department')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Pending</option><option>Accepted</option><option>Rejected</option><option>Joined</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Offer Date</Form.Label><Form.Control type="date" value={formData.offer_date} onChange={set('offer_date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Expected Join Date</Form.Label><Form.Control type="date" value={formData.join_date} onChange={set('join_date')} /></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Notes</Form.Label><Form.Control as="textarea" rows={3} value={formData.notes} onChange={set('notes')} /></Form.Group></Col>
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

export default Onboard;
