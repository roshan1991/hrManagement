import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/general-settings';

const DEFAULT_SETTINGS = {
  company_name: 'Cyclone Nepal IT',
  company_email: 'info@cyclonenepal.com',
  company_phone: '+977-1-4XXXXXX',
  company_address: 'Kathmandu, Nepal',
  timezone: 'Asia/Kathmandu',
  date_format: 'DD/MM/YYYY',
  currency: 'NPR',
  currency_symbol: 'Rs.',
  working_days: '5',
  working_hours_start: '09:00',
  working_hours_end: '17:00',
  late_mark_after: '15',
  probation_period: '3',
  fiscal_year_start: '2025-07-16',
  language: 'en',
};

const GeneralSettings = () => {
  const [formData, setFormData] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data && res.data.length > 0) {
        const latest = res.data[res.data.length - 1];
        setRecordId(latest.id);
        const mapped = {};
        for (const key of Object.keys(DEFAULT_SETTINGS)) {
          mapped[key] = latest[key] !== undefined && latest[key] !== null ? latest[key].toString() : DEFAULT_SETTINGS[key];
        }
        setFormData(mapped);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (recordId) {
        await axios.put(`${API_URL}/${recordId}`, formData);
      } else {
        const res = await axios.post(API_URL, formData);
        setRecordId(res.data.id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
  };

  return (
    <div>
      {saved && <Alert variant="success" className="mb-4"><i className="ti ti-check me-2"></i>General settings saved successfully!</Alert>}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">General Settings</h4>
        <p className="text-muted mb-0 small">Configure core company metadata and preferences</p>
      </div>

      <Form onSubmit={handleSave}>
        <Row className="g-4">
          <Col md={8}>
            <Card className="premium-card">
              <Card.Header className="bg-transparent border-0">
                <h5 className="fw-bold mb-0">Company Information</h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control value={formData.company_name} onChange={set('company_name')} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Company Email</Form.Label>
                      <Form.Control type="email" value={formData.company_email} onChange={set('company_email')} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Company Phone</Form.Label>
                      <Form.Control value={formData.company_phone} onChange={set('company_phone')} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control value={formData.company_address} onChange={set('company_address')} />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="premium-card mt-4">
              <Card.Header className="bg-transparent border-0">
                <h5 className="fw-bold mb-0">System Preferences</h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Timezone</Form.Label>
                      <Form.Select value={formData.timezone} onChange={set('timezone')}>
                        <option value="Asia/Kathmandu">Asia/Kathmandu (+5:45)</option>
                        <option value="Asia/Kolkata">Asia/Kolkata (+5:30)</option>
                        <option value="UTC">UTC (GMT+0)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Date Format</Form.Label>
                      <Form.Select value={formData.date_format} onChange={set('date_format')}>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>System Language</Form.Label>
                      <Form.Select value={formData.language} onChange={set('language')}>
                        <option value="en">English</option>
                        <option value="ne">Nepali</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="premium-card">
              <Card.Header className="bg-transparent border-0">
                <h5 className="fw-bold mb-0">Localization</h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Currency Code</Form.Label>
                      <Form.Control value={formData.currency} onChange={set('currency')} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Symbol</Form.Label>
                      <Form.Control value={formData.currency_symbol} onChange={set('currency_symbol')} />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Fiscal Year Start</Form.Label>
                      <Form.Control type="date" value={formData.fiscal_year_start} onChange={set('fiscal_year_start')} />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={12} className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" type="button" onClick={() => setFormData(DEFAULT_SETTINGS)}>
              Reset Defaults
            </Button>
            <Button variant="primary" type="submit">
              Save Preferences
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default GeneralSettings;
