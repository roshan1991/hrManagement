import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Card, InputGroup } from 'react-bootstrap';
import { useEmployees } from '../hooks/useEmployees';

const SAMPLE_REQUESTS = [
  { id: 1, employee: 'Rajesh Sharma', department: 'Engineering', leave_type: 'Annual Leave', start_date: '2025-06-10', end_date: '2025-06-12', days: 3, reason: 'Family vacation', status: 'Pending' },
  { id: 2, employee: 'Priya Thapa', department: 'HR', leave_type: 'Sick Leave', start_date: '2025-06-05', end_date: '2025-06-06', days: 2, reason: 'Medical appointment', status: 'Approved' },
  { id: 3, employee: 'Amit Poudel', department: 'Finance', leave_type: 'Casual Leave', start_date: '2025-06-15', end_date: '2025-06-15', days: 1, reason: 'Personal work', status: 'Rejected' },
  { id: 4, employee: 'Sunita Gurung', department: 'Marketing', leave_type: 'Maternity Leave', start_date: '2025-07-01', end_date: '2025-09-30', days: 90, reason: 'Maternity leave', status: 'Approved' },
];

const LEAVE_TYPES = ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Maternity Leave', 'Paternity Leave', 'Emergency Leave'];

const emptyForm = { employee: '', leave_type: '', start_date: '', end_date: '', reason: '', attachment: '', status: 'Pending' };

const statusColor = { Pending: 'warning', Approved: 'success', Rejected: 'danger' };

const API_URL = 'http://localhost:5000/api/leave-request';

const LeaveRequest = () => {
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
  const [filterStatus, setFilterStatus] = useState('');

  const handleClose = () => { setShow(false); setFormData(emptyForm); setEditingId(null); };
  const handleShow = () => setShow(true);
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

  const handleEdit = (item) => { setFormData({ ...item }); setEditingId(item.id); handleShow(); };
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

  const counts = { Pending: items.filter(i => i.status === 'Pending').length, Approved: items.filter(i => i.status === 'Approved').length, Rejected: items.filter(i => i.status === 'Rejected').length };
  const filtered = items.filter(i => filterStatus === '' || i.status === filterStatus);

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Leave Requests</h4>
          <p className="text-muted mb-0 small">Manage employee leave applications</p>
        </div>
        <Button variant="primary" onClick={handleShow}><i className="ti ti-calendar-plus me-1"></i>Create Leave Request</Button>
      </div>

      <Row className="mb-4 g-3">
        {[
          { label: 'Pending', count: counts.Pending, color: 'warning', icon: 'ti-clock' },
          { label: 'Approved', count: counts.Approved, color: 'success', icon: 'ti-calendar-check' },
          { label: 'Rejected', count: counts.Rejected, color: 'danger', icon: 'ti-calendar-x' },
          { label: 'Total', count: items.length, color: 'primary', icon: 'ti-calendar' },
        ].map((s, i) => (
          <Col key={i} xs={6} md={3}>
            <Card className={`border-0 bg-label-${s.color} h-100`} role="button" onClick={() => setFilterStatus(s.label === 'Total' ? '' : s.label)}>
              <Card.Body className="p-3">
                <div className="d-flex align-items-center gap-2">
                  <i className={`ti ${s.icon} ti-lg text-${s.color}`}></i>
                  <div>
                    <div className={`fw-bold fs-5 text-${s.color}`}>{s.count}</div>
                    <small className={`text-${s.color}`}>{s.label}</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex gap-2 mb-3">
        {['', 'Pending', 'Approved', 'Rejected'].map(s => (
          <Button key={s} variant={filterStatus === s ? 'primary' : 'outline-secondary'} size="sm" onClick={() => setFilterStatus(s)}>
            {s || 'All'} {s && <Badge bg={statusColor[s]} className="ms-1">{counts[s]}</Badge>}
          </Button>
        ))}
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th><th>Employee</th><th>Leave Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Status</th><th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="fw-medium">{item.employee}</div>
                  <small className="text-muted">{item.department}</small>
                </td>
                <td><span className="badge bg-label-info text-info">{item.leave_type}</span></td>
                <td>{item.start_date}</td>
                <td>{item.end_date}</td>
                <td><strong>{item.days}</strong></td>
                <td><span className="text-muted small">{item.reason}</span></td>
                <td>
                  <Badge bg={statusColor[item.status]} className={`bg-label-${statusColor[item.status]} text-${statusColor[item.status]}`}>
                    {item.status}
                  </Badge>
                </td>
                <td className="text-end">
                  {item.status === 'Pending' && (
                    <>
                      <Button variant="light" size="sm" className="me-1 text-success" onClick={() => updateStatus(item.id, 'Approved')} title="Approve"><i className="ti ti-check"></i></Button>
                      <Button variant="light" size="sm" className="me-1 text-danger" onClick={() => updateStatus(item.id, 'Rejected')} title="Reject"><i className="ti ti-x"></i></Button>
                    </>
                  )}
                  <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)} title="Edit"><i className="ti ti-edit"></i></Button>
                  <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)} title="Delete"><i className="ti ti-trash"></i></Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="9" className="text-center py-4 text-muted">No leave requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Leave Request' : 'Create Leave Request'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}><Form.Group><Form.Label>Employee <span className="text-danger">*</span></Form.Label><Form.Select required value={formData.employee} onChange={set('employee')}><option value="">Select Employee</option>{employees.map(e => <option key={e}>{e}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Leave Type <span className="text-danger">*</span></Form.Label><Form.Select required value={formData.leave_type} onChange={set('leave_type')}><option value="">Select Type</option>{LEAVE_TYPES.map(l => <option key={l}>{l}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Start Date <span className="text-danger">*</span></Form.Label><Form.Control type="date" required value={formData.start_date} onChange={set('start_date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>End Date <span className="text-danger">*</span></Form.Label><Form.Control type="date" required value={formData.end_date} onChange={set('end_date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Pending</option><option>Approved</option><option>Rejected</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Attachment</Form.Label><Form.Control type="file" /></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Reason <span className="text-danger">*</span></Form.Label><Form.Control as="textarea" rows={3} required value={formData.reason} onChange={set('reason')} placeholder="Reason for leave..." /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Submit Request</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default LeaveRequest;
