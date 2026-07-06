import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ROUTERS = [
  { id: 1, name: 'Main Office Router', ip: '192.168.1.1', location: 'Server Room', model: 'Cisco RV340', status: 'Online', uptime: '99.8%', connected: 48 },
  { id: 2, name: 'Floor 2 Access Point', ip: '192.168.1.101', location: 'Floor 2', model: 'TP-Link EAP245', status: 'Online', uptime: '99.5%', connected: 22 },
  { id: 3, name: 'Backup Router', ip: '192.168.2.1', location: 'IT Room', model: 'MikroTik RB450', status: 'Offline', uptime: '0%', connected: 0 },
];

const statusColor = { Online: 'success', Offline: 'danger', Degraded: 'warning' };

const API_URL = 'http://localhost:5000/api/routers';

const Routers = () => {
  const [devices, setDevices] = useState(ROUTERS);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: '', ip: '', location: '', model: '', status: 'Online' });
  const [saved, setSaved] = useState(false);

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDevices([...devices, { ...formData, id: Date.now(), uptime: '—', connected: 0 }]);
    setFormData({ name: '', ip: '', location: '', model: '', status: 'Online' });
    setShow(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalOnline = devices.filter(d => d.status === 'Online').length;
  const totalConnected = devices.reduce((s, d) => s + d.connected, 0);

  return (
    <div>
      {saved && <Alert variant="success" className="mb-4"><i className="ti ti-check me-2"></i>Device added successfully!</Alert>}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Network Routers</h4>
          <p className="text-muted mb-0 small">Monitor network devices and access points</p>
        </div>
        <Button variant="primary" onClick={() => setShow(!show)}><i className="ti ti-plus me-1"></i>Add Device</Button>
      </div>

      <Row className="g-3 mb-4">
        {[
          { label: 'Total Devices', value: devices.length, color: 'primary', icon: 'ti-router' },
          { label: 'Online', value: totalOnline, color: 'success', icon: 'ti-wifi' },
          { label: 'Offline', value: devices.length - totalOnline, color: 'danger', icon: 'ti-wifi-off' },
          { label: 'Connected Devices', value: totalConnected, color: 'info', icon: 'ti-devices' },
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

      {show && (
        <Card className="premium-card mb-4">
          <Card.Header className="bg-transparent border-0"><h6 className="fw-bold mb-0">Add Network Device</h6></Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={4}><Form.Group><Form.Label>Device Name <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.name} onChange={set('name')} /></Form.Group></Col>
                <Col md={3}><Form.Group><Form.Label>IP Address</Form.Label><Form.Control value={formData.ip} onChange={set('ip')} placeholder="192.168.x.x" /></Form.Group></Col>
                <Col md={3}><Form.Group><Form.Label>Location</Form.Label><Form.Control value={formData.location} onChange={set('location')} /></Form.Group></Col>
                <Col md={2}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Online</option><option>Offline</option></Form.Select></Form.Group></Col>
                <Col md={4}><Form.Group><Form.Label>Device Model</Form.Label><Form.Control value={formData.model} onChange={set('model')} /></Form.Group></Col>
              </Row>
              <div className="d-flex gap-2 mt-3">
                <Button variant="primary" type="submit">Add Device</Button>
                <Button variant="outline-secondary" onClick={() => setShow(false)}>Cancel</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Row className="g-3">
        {devices.map(d => (
          <Col key={d.id} md={6} xl={4}>
            <Card className={`premium-card border-2 ${d.status === 'Online' ? 'border-success border-opacity-25' : 'border-danger border-opacity-25'}`}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="fw-bold mb-1">{d.name}</h6>
                    <small className="text-muted">{d.model}</small>
                  </div>
                  <span className={`badge bg-label-${statusColor[d.status]} text-${statusColor[d.status]}`}>
                    <i className={`ti ${d.status === 'Online' ? 'ti-circle-filled' : 'ti-circle'} me-1`} style={{ fontSize: '0.5rem' }}></i>
                    {d.status}
                  </span>
                </div>
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex justify-content-between small"><span className="text-muted">IP Address</span><span className="fw-medium font-monospace">{d.ip}</span></div>
                  <div className="d-flex justify-content-between small"><span className="text-muted">Location</span><span>{d.location}</span></div>
                  <div className="d-flex justify-content-between small"><span className="text-muted">Uptime</span><span className={`fw-medium text-${statusColor[d.status]}`}>{d.uptime}</span></div>
                  <div className="d-flex justify-content-between small"><span className="text-muted">Connected</span><span><strong>{d.connected}</strong> devices</span></div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Routers;
