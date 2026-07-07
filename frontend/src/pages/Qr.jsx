import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table } from 'react-bootstrap';
import { useBranches } from '../hooks/useBranches';

const SAMPLE = [
  { id: 1, branch_id: 'Head Office', title: 'Main Entry QR Code', code: 'QR-HO-001', generated: '2025-01-01', status: 'Active', scans: 512 },
  { id: 2, branch_id: 'Kathmandu Branch', title: 'Kathmandu Branch Check-In', code: 'QR-KB-001', generated: '2025-02-01', status: 'Active', scans: 287 },
  { id: 3, branch_id: 'Pokhara Branch', title: 'Pokhara Attendance QR', code: 'QR-PB-001', generated: '2025-01-15', status: 'Active', scans: 194 },
];

const emptyForm = { branch_id: '', title: '', status: 'Active' };

const API_URL = 'http://localhost:5000/api/qr';

const Qr = () => {
  const { branches } = useBranches();
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
  const set = (f) => (e) => setFormData({ ...formData, [f]: e.target.value });

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

  const handleEdit = (item) => { setFormData({ branch_id: item.branch_id, title: item.title, status: item.status }); setEditingId(item.id); setShow(true); };
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
          <h4 className="fw-bold mb-1">QR Codes (Branch Attendance)</h4>
          <p className="text-muted mb-0 small">Manage QR codes assigned per branch for attendance</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-qrcode me-1"></i>Add QR</Button>
      </div>

      <Row className="mb-3 g-2">
        <Col md={3}>
          <Form.Select onChange={e => {}}>
            <option value="">All Branches</option>
            {BRANCHES.map(b => <option key={b}>{b}</option>)}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button variant="outline-secondary" className="w-100"><i className="ti ti-refresh me-1"></i>Reset</Button>
        </Col>
      </Row>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Title</th><th>Branch</th><th>QR Code</th><th>Generated</th><th>Total Scans</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td className="fw-medium">{item.title}</td>
              <td><Badge bg="info" className="bg-label-info text-info">{branches.find(b => String(b.id) === String(item.branch_id))?.name || item.branch_id || '-'}</Badge></td>
              <td><code className="small text-muted">{item.code}</code></td>
              <td>{item.generated}</td>
              <td><strong className="text-primary">{item.scans.toLocaleString()}</strong></td>
              <td><Badge bg={item.status === 'Active' ? 'success' : 'secondary'} className={`bg-label-${item.status === 'Active' ? 'success' : 'secondary'} text-${item.status === 'Active' ? 'success' : 'secondary'}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-info" title="Download QR"><i className="ti ti-download"></i></Button>
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)} title="Edit"><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)} title="Delete"><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="8" className="text-center py-4 text-muted">No QR codes found.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit QR Code' : 'Add QR Code'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Branch <span className="text-danger">*</span></Form.Label>
              <Form.Select required value={formData.branch_id} onChange={set('branch_id')}>
                <option value="">Select Branch</option>
                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title <span className="text-danger">*</span></Form.Label>
              <Form.Control required value={formData.title} onChange={set('title')} placeholder="e.g. Main Entry QR" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={formData.status} onChange={set('status')}>
                <option>Active</option><option>Inactive</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit"><i className="ti ti-qrcode me-1"></i>Generate QR</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Qr;
