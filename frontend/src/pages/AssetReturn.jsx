import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, asset_name: 'Dell Laptop #014', asset_code: 'ASSET-014-LP', employee: 'Rajesh Sharma', assigned_date: '2024-01-15', return_date: '2025-06-01', condition: 'Good', notes: 'Minor scratches on lid', status: 'Returned' },
  { id: 2, asset_name: 'iPhone 13 Pro', asset_code: 'ASSET-022-MB', employee: 'Priya Thapa', assigned_date: '2024-03-01', return_date: '', condition: '', notes: '', status: 'Pending Return' },
  { id: 3, asset_name: 'Ergonomic Chair', asset_code: 'ASSET-007-FN', employee: 'Amit Poudel', assigned_date: '2023-08-01', return_date: '2025-05-20', condition: 'Damaged', notes: 'Armrest broken, needs repair', status: 'Returned' },
];

const EMPLOYEES = ['Rajesh Sharma', 'Priya Thapa', 'Amit Poudel', 'Sunita Gurung', 'Bikash Rai'];
const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Damaged', 'Lost'];
const statusColor = { 'Returned': 'success', 'Pending Return': 'warning', 'Overdue': 'danger' };

const emptyForm = { asset_name: '', asset_code: '', employee: '', assigned_date: '', return_date: '', condition: '', notes: '', status: 'Pending Return' };

const API_URL = 'http://localhost:5000/api/asset-return';

const AssetReturn = () => {
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
          <h4 className="fw-bold mb-1">Asset Returns</h4>
          <p className="text-muted mb-0 small">Track returned and pending-return company assets</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-plus me-1"></i>Record Return</Button>
      </div>

      <Row className="mb-4 g-3">
        {[
          { label: 'Total Records', value: items.length, color: 'primary', icon: 'ti-package' },
          { label: 'Returned', value: items.filter(i => i.status === 'Returned').length, color: 'success', icon: 'ti-circle-check' },
          { label: 'Pending Return', value: items.filter(i => i.status === 'Pending Return').length, color: 'warning', icon: 'ti-clock' },
          { label: 'Damaged', value: items.filter(i => i.condition === 'Damaged').length, color: 'danger', icon: 'ti-alert-triangle' },
        ].map((s, i) => (
          <Col key={i} xs={6} md={3}>
            <div className={`card border-0 bg-label-${s.color} h-100`}>
              <div className="card-body d-flex align-items-center gap-2 p-3">
                <i className={`ti ${s.icon} ti-lg text-${s.color}`}></i>
                <div>
                  <div className={`fw-bold fs-4 text-${s.color}`}>{s.value}</div>
                  <small className={`text-${s.color}`}>{s.label}</small>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Asset</th><th>Employee</th><th>Assigned</th><th>Return Date</th><th>Condition</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <div className="fw-medium">{item.asset_name}</div>
                <small className="text-muted font-monospace">{item.asset_code}</small>
              </td>
              <td>{item.employee}</td>
              <td>{item.assigned_date}</td>
              <td>{item.return_date || <span className="text-warning">Not returned</span>}</td>
              <td>
                {item.condition ? (
                  <Badge bg={item.condition === 'Damaged' ? 'danger' : item.condition === 'Good' || item.condition === 'Excellent' ? 'success' : 'warning'}
                    className={`bg-label-${item.condition === 'Damaged' ? 'danger' : 'success'} text-${item.condition === 'Damaged' ? 'danger' : 'success'}`}>
                    {item.condition}
                  </Badge>
                ) : <span className="text-muted">—</span>}
              </td>
              <td><Badge bg={statusColor[item.status]} className={`bg-label-${statusColor[item.status]} text-${statusColor[item.status]}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="8" className="text-center py-4 text-muted">No asset return records.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Return Record' : 'Record Asset Return'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}><Form.Group><Form.Label>Asset Name <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.asset_name} onChange={set('asset_name')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Asset Code</Form.Label><Form.Control value={formData.asset_code} onChange={set('asset_code')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Employee</Form.Label><Form.Select value={formData.employee} onChange={set('employee')}><option value="">Select Employee</option>{EMPLOYEES.map(e => <option key={e}>{e}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Assigned Date</Form.Label><Form.Control type="date" value={formData.assigned_date} onChange={set('assigned_date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Return Date</Form.Label><Form.Control type="date" value={formData.return_date} onChange={set('return_date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Condition on Return</Form.Label><Form.Select value={formData.condition} onChange={set('condition')}><option value="">Select Condition</option>{CONDITIONS.map(c => <option key={c}>{c}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Pending Return</option><option>Returned</option><option>Overdue</option></Form.Select></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Notes</Form.Label><Form.Control as="textarea" rows={2} value={formData.notes} onChange={set('notes')} /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Record</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AssetReturn;
