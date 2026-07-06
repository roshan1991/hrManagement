import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Button, Badge, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/feature-control';

const DEFAULT_FEATURES = [
  { id: 1, name: 'Leave Management', description: 'Enable employee leave requests and approvals', icon: 'ti-calendar-off', enabled: true, category: 'HR' },
  { id: 2, name: 'Attendance Tracking', description: 'QR/NFC/Biometric based attendance', icon: 'ti-clock', enabled: true, category: 'HR' },
  { id: 3, name: 'Payroll Processing', description: 'Automated salary calculation and disbursement', icon: 'ti-credit-card', enabled: true, category: 'Finance' },
  { id: 4, name: 'Loan Management', description: 'Employee loan applications and repayments', icon: 'ti-moneybag', enabled: false, category: 'Finance' },
  { id: 5, name: 'Recruitment', description: 'Job postings, applicants, and hiring pipeline', icon: 'ti-briefcase', enabled: true, category: 'Recruitment' },
  { id: 6, name: 'Training & Development', description: 'Schedule and track employee training programs', icon: 'ti-school', enabled: true, category: 'HR' },
  { id: 7, name: 'Asset Management', description: 'Track and manage company assets assigned to employees', icon: 'ti-device-laptop', enabled: false, category: 'Operations' },
  { id: 8, name: 'Project Management', description: 'Track projects, tasks, and team assignments', icon: 'ti-layout-kanban', enabled: true, category: 'Operations' },
  { id: 9, name: 'TADA (Travel Allowance)', description: 'Travel and daily allowance management', icon: 'ti-plane', enabled: false, category: 'Finance' },
  { id: 10, name: 'NFC Integration', description: 'NFC card-based employee check-in/out', icon: 'ti-wifi', enabled: false, category: 'Technology' },
  { id: 11, name: 'Biometric Device', description: 'Biometric fingerprint based attendance', icon: 'ti-fingerprint', enabled: true, category: 'Technology' },
  { id: 12, name: 'Awards & Recognition', description: 'Employee achievement and award tracking', icon: 'ti-award', enabled: true, category: 'HR' },
];

const CATEGORIES = ['All', 'HR', 'Finance', 'Recruitment', 'Operations', 'Technology'];

const FeatureControl = () => {
  const [features, setFeatures] = useState(DEFAULT_FEATURES);
  const [filterCat, setFilterCat] = useState('All');
  const [recordId, setRecordId] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data && res.data.length > 0) {
        const latest = res.data[res.data.length - 1];
        setRecordId(latest.id);
        if (latest.features) {
          setFeatures(JSON.parse(latest.features));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveFeatures = async (updated) => {
    try {
      if (recordId) {
        await axios.put(`${API_URL}/${recordId}`, { features: JSON.stringify(updated) });
      } else {
        const res = await axios.post(API_URL, { features: JSON.stringify(updated) });
        setRecordId(res.data.id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const toggle = (id) => {
    const updated = features.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f);
    setFeatures(updated);
    saveFeatures(updated);
  };

  const filtered = features.filter(f => filterCat === 'All' || f.category === filterCat);
  const enabledCount = features.filter(f => f.enabled).length;

  return (
    <div className="premium-card p-4">
      {saved && <Alert variant="success" className="position-fixed top-0 start-50 translate-middle-x mt-4" style={{ zIndex: 1050 }}><i className="ti ti-check me-2"></i>Features updated!</Alert>}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Feature Control</h4>
          <p className="text-muted mb-0 small">Enable or disable system modules and features</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted small">{enabledCount} of {features.length} features active</span>
          <Badge bg="success" className="bg-label-success text-success px-3 py-2">{enabledCount} Active</Badge>
        </div>
      </div>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        {CATEGORIES.map(cat => (
          <Button key={cat} variant={filterCat === cat ? 'primary' : 'outline-secondary'} size="sm" onClick={() => setFilterCat(cat)}>
            {cat}
          </Button>
        ))}
      </div>

      <Row className="g-3">
        {filtered.map((feature) => (
          <Col key={feature.id} md={6} xl={4}>
            <Card className={`border h-100 ${feature.enabled ? 'border-primary border-opacity-25' : ''}`} style={{ transition: 'all 0.2s' }}>
              <Card.Body className="p-3">
                <div className="d-flex align-items-start justify-content-between">
                  <div className="d-flex gap-3 align-items-start flex-grow-1">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${feature.enabled ? 'bg-label-primary' : 'bg-label-secondary'}`} style={{ width: 44, height: 44 }}>
                      <i className={`ti ${feature.icon} ti-md ${feature.enabled ? 'text-primary' : 'text-muted'}`}></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1">{feature.name}</h6>
                      <p className="text-muted mb-1 small">{feature.description}</p>
                      <Badge bg="secondary" className="bg-label-secondary text-secondary" style={{ fontSize: '0.7rem' }}>{feature.category}</Badge>
                    </div>
                  </div>
                  <div className="ms-2 flex-shrink-0">
                    <Form.Check
                      type="switch"
                      checked={feature.enabled}
                      onChange={() => toggle(feature.id)}
                      className="fs-5"
                    />
                  </div>
                </div>
                <div className={`mt-2 small fw-medium ${feature.enabled ? 'text-success' : 'text-muted'}`}>
                  <i className={`ti ${feature.enabled ? 'ti-circle-check' : 'ti-circle-x'} me-1`}></i>
                  {feature.enabled ? 'Enabled' : 'Disabled'}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeatureControl;
