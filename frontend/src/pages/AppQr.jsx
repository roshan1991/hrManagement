import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Button, Badge, Alert, Table } from 'react-bootstrap';

const QR_TYPES = ['Employee Check-In', 'Asset Tracking', 'Event Access', 'Document Verification'];

const SAMPLE_QR = [
  { id: 1, title: 'Employee: Rajesh Sharma', type: 'Employee Check-In', code: 'EMP-001-2025', generated: '2025-05-01', expires: '2026-05-01', status: 'Active', scans: 142 },
  { id: 2, title: 'Asset: Laptop #014', type: 'Asset Tracking', code: 'ASSET-014-LP', generated: '2025-04-15', expires: '2026-04-15', status: 'Active', scans: 8 },
  { id: 3, title: 'Event: Annual Meeting', type: 'Event Access', code: 'EVT-AM-2025', generated: '2025-03-01', expires: '2025-03-31', status: 'Expired', scans: 96 },
];

const API_URL = 'http://localhost:5000/api/app-qr';

const AppQr = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ title: '', type: 'Employee Check-In', expires: '', status: 'Active' });
  const [saved, setSaved] = useState(false);

  const set = (f) => (e) => setFormData({ ...formData, [f]: e.target.value });

  const handleGenerate = async (e) => {
    e.preventDefault();
    const codeVal = `QR-${Date.now().toString(36).toUpperCase()}`;
    const newRecord = {
      ...formData,
      code: codeVal,
      generated: new Date().toISOString().slice(0, 10),
      scans: 0
    };
    try {
      await axios.post(API_URL, newRecord);
      fetchItems();
      setFormData({ title: '', type: 'Employee Check-In', expires: '', status: 'Active' });
      setShow(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to generate QR code.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this QR code?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert('Failed to delete QR code.');
      }
    }
  };

  return (
    <div>
      {saved && <Alert variant="success" className="mb-4"><i className="ti ti-check me-2"></i>QR code generated!</Alert>}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">App QR Codes</h4>
          <p className="text-muted mb-0 small">Generate and manage QR codes for the mobile app</p>
        </div>
        <Button variant="primary" onClick={() => setShow(!show)}><i className="ti ti-qrcode me-1"></i>Generate QR</Button>
      </div>

      {show && (
        <Card className="premium-card mb-4">
          <Card.Header className="bg-transparent border-0"><h6 className="fw-bold mb-0">New QR Code</h6></Card.Header>
          <Card.Body>
            <Form onSubmit={handleGenerate}>
              <Row className="g-3">
                <Col md={4}><Form.Group><Form.Label>Title / Description <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.title} onChange={set('title')} placeholder="e.g. Employee: John Doe" /></Form.Group></Col>
                <Col md={3}><Form.Group><Form.Label>QR Type</Form.Label><Form.Select value={formData.type} onChange={set('type')}>{QR_TYPES.map(t => <option key={t}>{t}</option>)}</Form.Select></Form.Group></Col>
                <Col md={3}><Form.Group><Form.Label>Expiry Date</Form.Label><Form.Control type="date" value={formData.expires} onChange={set('expires')} /></Form.Group></Col>
                <Col md={2} className="d-flex align-items-end gap-2">
                  <Button variant="primary" type="submit" className="flex-grow-1">Generate</Button>
                  <Button variant="outline-secondary" onClick={() => setShow(false)}>✕</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Row className="g-3 mb-4">
        {[
          { label: 'Total QR Codes', value: items.length, color: 'primary', icon: 'ti-qrcode' },
          { label: 'Active', value: items.filter(i => i.status === 'Active').length, color: 'success', icon: 'ti-circle-check' },
          { label: 'Expired', value: items.filter(i => i.status === 'Expired').length, color: 'warning', icon: 'ti-clock' },
          { label: 'Total Scans', value: items.reduce((s, i) => s + i.scans, 0), color: 'info', icon: 'ti-scan' },
        ].map((s, i) => (
          <Col key={i} xs={6} md={3}>
            <Card className={`border-0 bg-label-${s.color} h-100`}>
              <Card.Body className="d-flex align-items-center gap-2 p-3">
                <i className={`ti ${s.icon} ti-lg text-${s.color}`}></i>
                <div>
                  <div className={`fw-bold fs-4 text-${s.color}`}>{s.value}</div>
                  <small className={`text-${s.color}`}>{s.label}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="table-responsive premium-card">
        <Table hover className="align-middle mb-0">
          <thead className="table-light">
            <tr><th>#</th><th>Title</th><th>Type</th><th>Code</th><th>Generated</th><th>Expires</th><th>Scans</th><th>Status</th><th className="text-end">Actions</th></tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td className="fw-medium">{item.title}</td>
                <td><Badge bg="info" className="bg-label-info text-info">{item.type}</Badge></td>
                <td><code className="small text-muted">{item.code}</code></td>
                <td><small>{item.generated}</small></td>
                <td><small>{item.expires || '—'}</small></td>
                <td><span className="fw-bold text-primary">{item.scans}</span></td>
                <td><Badge bg={item.status === 'Active' ? 'success' : 'secondary'} className={`bg-label-${item.status === 'Active' ? 'success' : 'secondary'} text-${item.status === 'Active' ? 'success' : 'secondary'}`}>{item.status}</Badge></td>
                <td className="text-end">
                  <Button variant="light" size="sm" className="me-1 text-info" title="Download"><i className="ti ti-download"></i></Button>
                  <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)} title="Delete"><i className="ti ti-trash"></i></Button>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan="9" className="text-center py-4 text-muted">No QR codes generated yet.</td></tr>}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AppQr;
