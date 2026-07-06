import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Button, Badge, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/app-settings';

const DEFAULT_SETTINGS = [
  { section: 'Attendance', settings: [
    { key: 'qr_enabled', label: 'Enable QR Attendance', type: 'toggle', value: true },
    { key: 'nfc_enabled', label: 'Enable NFC Attendance', type: 'toggle', value: false },
    { key: 'biometric_enabled', label: 'Enable Biometric Attendance', type: 'toggle', value: true },
    { key: 'gps_tracking', label: 'Enable GPS Location Tracking', type: 'toggle', value: false },
    { key: 'selfie_required', label: 'Require Selfie on Check-In', type: 'toggle', value: false },
  ]},
  { section: 'Notifications', settings: [
    { key: 'email_notifications', label: 'Email Notifications', type: 'toggle', value: true },
    { key: 'push_notifications', label: 'Push Notifications', type: 'toggle', value: true },
    { key: 'sms_notifications', label: 'SMS Notifications', type: 'toggle', value: false },
  ]},
  { section: 'Security', settings: [
    { key: 'two_factor_auth', label: 'Two-Factor Authentication', type: 'toggle', value: false },
    { key: 'session_timeout', label: 'Auto Session Timeout (minutes)', type: 'number', value: '30' },
    { key: 'password_expiry', label: 'Password Expiry (days)', type: 'number', value: '90' },
  ]},
  { section: 'App Behavior', settings: [
    { key: 'dark_mode', label: 'Default Dark Mode', type: 'toggle', value: false },
    { key: 'language', label: 'Default Language', type: 'select', value: 'English', options: ['English', 'Nepali'] },
    { key: 'date_format', label: 'Date Format', type: 'select', value: 'DD/MM/YYYY', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] },
    { key: 'items_per_page', label: 'Items Per Page', type: 'number', value: '25' },
  ]},
];

const AppSettings = () => {
  const [sections, setSections] = useState(DEFAULT_SETTINGS);
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
        if (latest.settings) {
          setSections(JSON.parse(latest.settings));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateSetting = (sectionIdx, key, val) => {
    setSections(sections.map((sec, si) => si !== sectionIdx ? sec : {
      ...sec,
      settings: sec.settings.map(s => s.key === key ? { ...s, value: val } : s)
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (recordId) {
        await axios.put(`${API_URL}/${recordId}`, { settings: JSON.stringify(sections) });
      } else {
        const res = await axios.post(API_URL, { settings: JSON.stringify(sections) });
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
      {saved && <Alert variant="success" className="mb-4"><i className="ti ti-check me-2"></i>App settings saved successfully!</Alert>}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">App Settings</h4>
        <p className="text-muted mb-0 small">Configure global application behavior and features</p>
      </div>

      <Form onSubmit={handleSave}>
        <Row className="g-4">
          {sections.map((section, si) => (
            <Col key={si} md={6}>
              <Card className="premium-card h-100">
                <Card.Header className="bg-transparent border-0">
                  <h5 className="fw-bold mb-0">
                    <i className={`ti ${['ti-clock', 'ti-bell', 'ti-shield', 'ti-settings'][si]} me-2 text-primary`}></i>
                    {section.section}
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex flex-column gap-3">
                    {section.settings.map(s => (
                      <div key={s.key} className="d-flex align-items-center justify-content-between gap-3">
                        <div className="flex-grow-1">
                          <div className="fw-medium small">{s.label}</div>
                        </div>
                        {s.type === 'toggle' ? (
                          <Form.Check
                            type="switch"
                            checked={s.value}
                            onChange={() => updateSetting(si, s.key, !s.value)}
                          />
                        ) : s.type === 'select' ? (
                          <Form.Select size="sm" value={s.value} onChange={e => updateSetting(si, s.key, e.target.value)} style={{ maxWidth: '140px' }}>
                            {s.options.map(o => <option key={o}>{o}</option>)}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            size="sm"
                            type="number"
                            value={s.value}
                            onChange={e => updateSetting(si, s.key, e.target.value)}
                            style={{ maxWidth: '90px' }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}

          <Col md={12} className="d-flex justify-content-end gap-2">
            <Button variant="outline-secondary" type="button" onClick={() => setSections(DEFAULT_SETTINGS)}>
              <i className="ti ti-refresh me-1"></i>Reset All
            </Button>
            <Button variant="primary" type="submit">
              <i className="ti ti-device-floppy me-2"></i>Save Settings
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AppSettings;
