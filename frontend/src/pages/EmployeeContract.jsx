import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, name: 'Annual Leave', description: 'Year-end employment contract renewal', employee: 'Rajesh Sharma', contract_type: 'Permanent', start_date: '2024-01-01', end_date: '2024-12-31', status: 'Active' },
  { id: 2, name: 'Project Contract', description: 'Fixed-term project based engagement', employee: 'Sunita Gurung', contract_type: 'Contract', start_date: '2025-01-01', end_date: '2025-06-30', status: 'Active' },
  { id: 3, name: 'Probation Agreement', description: 'Probation period employment terms', employee: 'Bikash Rai', contract_type: 'Probation', start_date: '2025-05-01', end_date: '2025-07-31', status: 'Active' },
];

const EMPLOYEES = ['Rajesh Sharma', 'Priya Thapa', 'Amit Poudel', 'Sunita Gurung', 'Bikash Rai'];
const CONTRACT_TYPES = ['Permanent', 'Contract', 'Probation', 'Part-Time', 'Freelance'];

const emptyForm = { name: '', description: '', employee: '', contract_type: 'Permanent', start_date: '', end_date: '', status: 'Active' };

const API_URL = 'http://localhost:5000/api/employee-contract';

const EmployeeContract = () => {
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
          <h4 className="fw-bold mb-1">Employee Contracts</h4>
          <p className="text-muted mb-0 small">Manage employment contracts and agreements</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-plus me-1"></i>Create Contract</Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Contract Name</th><th>Employee</th><th>Type</th><th>Start Date</th><th>End Date</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <div className="fw-medium">{item.name}</div>
                <small className="text-muted">{item.description}</small>
              </td>
              <td>{item.employee}</td>
              <td><Badge bg="info" className="bg-label-info text-info">{item.contract_type}</Badge></td>
              <td>{item.start_date}</td>
              <td>{item.end_date}</td>
              <td><Badge bg={item.status === 'Active' ? 'success' : 'secondary'} className={`bg-label-${item.status === 'Active' ? 'success' : 'secondary'} text-${item.status === 'Active' ? 'success' : 'secondary'}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="8" className="text-center py-4 text-muted">No contracts found.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Contract' : 'Create Employee Contract'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}><Form.Group><Form.Label>Contract Name / Title <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.name} onChange={set('name')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Employee</Form.Label><Form.Select value={formData.employee} onChange={set('employee')}><option value="">Select Employee</option>{EMPLOYEES.map(e => <option key={e}>{e}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Contract Type</Form.Label><Form.Select value={formData.contract_type} onChange={set('contract_type')}>{CONTRACT_TYPES.map(c => <option key={c}>{c}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Start Date</Form.Label><Form.Control type="date" value={formData.start_date} onChange={set('start_date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>End Date</Form.Label><Form.Control type="date" value={formData.end_date} onChange={set('end_date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Active</option><option>Inactive</option><option>Expired</option></Form.Select></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} value={formData.description} onChange={set('description')} /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Contract</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeContract;
