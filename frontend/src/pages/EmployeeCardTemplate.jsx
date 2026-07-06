import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Button, Badge, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/employee-card-template';

const TEMPLATE_FIELDS = [
  { key: 'show_photo', label: 'Show Employee Photo', type: 'toggle', value: true },
  { key: 'show_qr', label: 'Show QR Code', type: 'toggle', value: true },
  { key: 'show_department', label: 'Show Department', type: 'toggle', value: true },
  { key: 'show_designation', label: 'Show Designation', type: 'toggle', value: true },
  { key: 'show_phone', label: 'Show Phone Number', type: 'toggle', value: false },
  { key: 'show_email', label: 'Show Email', type: 'toggle', value: false },
  { key: 'show_blood_group', label: 'Show Blood Group', type: 'toggle', value: true },
  { key: 'show_join_date', label: 'Show Join Date', type: 'toggle', value: false },
];

const EmployeeCardTemplate = () => {
  const [settings, setSettings] = useState(TEMPLATE_FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: f.value }), {}));
  const [cardSettings, setCardSettings] = useState({
    company_name: 'Cyclone Nepal IT Solutions',
    tagline: 'Digital HR System',
    primary_color: '#696cff',
    bg_color: '#ffffff',
    text_color: '#566a7f',
    card_width: '85',
    card_height: '54',
    font_size: '12',
  });
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
        if (latest.settings) setSettings(JSON.parse(latest.settings));
        if (latest.cardSettings) setCardSettings(JSON.parse(latest.cardSettings));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));
  const setCard = (field) => (e) => setCardSettings(c => ({ ...c, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        settings: JSON.stringify(settings),
        cardSettings: JSON.stringify(cardSettings)
      };
      if (recordId) {
        await axios.put(`${API_URL}/${recordId}`, payload);
      } else {
        const res = await axios.post(API_URL, payload);
        setRecordId(res.data.id);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to save template.');
    }
  };

  return (
    <div>
      {saved && <Alert variant="success" className="mb-4"><i className="ti ti-check me-2"></i>Template saved successfully!</Alert>}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Employee Card Template</h4>
        <p className="text-muted mb-0 small">Configure the design and fields for employee ID cards</p>
      </div>

      <Row className="g-4">
        <Col md={5}>
          <Card className="premium-card mb-4">
            <Card.Header className="bg-transparent border-0">
              <h5 className="fw-bold mb-0"><i className="ti ti-settings me-2 text-primary"></i>Card Settings</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSave}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control value={cardSettings.company_name} onChange={setCard('company_name')} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tagline</Form.Label>
                  <Form.Control value={cardSettings.tagline} onChange={setCard('tagline')} />
                </Form.Group>
                <Row className="g-2 mb-3">
                  <Col><Form.Group><Form.Label>Primary Color</Form.Label><Form.Control type="color" value={cardSettings.primary_color} onChange={setCard('primary_color')} /></Form.Group></Col>
                  <Col><Form.Group><Form.Label>Background</Form.Label><Form.Control type="color" value={cardSettings.bg_color} onChange={setCard('bg_color')} /></Form.Group></Col>
                  <Col><Form.Group><Form.Label>Text Color</Form.Label><Form.Control type="color" value={cardSettings.text_color} onChange={setCard('text_color')} /></Form.Group></Col>
                </Row>
                <div className="border-top pt-3">
                  <h6 className="fw-semibold mb-3">Visible Fields</h6>
                  {TEMPLATE_FIELDS.map(f => (
                    <div key={f.key} className="d-flex justify-content-between align-items-center mb-2">
                      <small>{f.label}</small>
                      <Form.Check type="switch" checked={settings[f.key]} onChange={() => toggle(f.key)} />
                    </div>
                  ))}
                </div>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                  <i className="ti ti-device-floppy me-2"></i>Save Template
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={7}>
          <Card className="premium-card">
            <Card.Header className="bg-transparent border-0">
              <h5 className="fw-bold mb-0"><i className="ti ti-id-badge me-2 text-primary"></i>Card Preview</h5>
            </Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center py-5" style={{ background: '#f8f9fa' }}>
              <div
                className="shadow-lg rounded overflow-hidden"
                style={{
                  width: '280px',
                  background: cardSettings.bg_color,
                  border: `3px solid ${cardSettings.primary_color}`,
                  fontFamily: 'sans-serif',
                }}
              >
                <div className="p-3 text-white text-center" style={{ background: cardSettings.primary_color }}>
                  <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{cardSettings.company_name}</div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>{cardSettings.tagline}</div>
                </div>

                <div className="p-3 text-center">
                  {settings.show_photo && (
                    <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center mx-auto mb-2" style={{ width: 70, height: 70 }}>
                      <i className="ti ti-user" style={{ fontSize: '2rem', color: cardSettings.primary_color }}></i>
                    </div>
                  )}
                  <div className="fw-bold mb-0" style={{ fontSize: '1rem', color: '#333' }}>John Doe</div>
                  {settings.show_designation && <div style={{ fontSize: '0.75rem', color: cardSettings.primary_color, fontWeight: 600 }}>Senior Developer</div>}
                  {settings.show_department && <div style={{ fontSize: '0.72rem', color: cardSettings.text_color }}>Engineering Department</div>}

                  <div className="border-top mt-2 pt-2">
                    {settings.show_phone && <div style={{ fontSize: '0.7rem', color: cardSettings.text_color }}>📱 +977-9841000001</div>}
                    {settings.show_email && <div style={{ fontSize: '0.7rem', color: cardSettings.text_color }}>✉ john@company.com</div>}
                    {settings.show_blood_group && (
                      <span className="badge mt-1" style={{ background: cardSettings.primary_color, fontSize: '0.65rem' }}>Blood Group: O+</span>
                    )}
                  </div>

                  {settings.show_qr && (
                    <div className="mt-2 d-flex align-items-center justify-content-center">
                      <div className="border p-1 rounded" style={{ width: 50, height: 50, background: '#f0f0f0' }}>
                        <div style={{ fontSize: '0.6rem', color: '#999', lineHeight: 1.2 }}>QR<br/>Code</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center py-1" style={{ background: cardSettings.primary_color, fontSize: '0.6rem', color: 'rgba(255,255,255,0.8)' }}>
                  EMP-2025-0001
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EmployeeCardTemplate;
