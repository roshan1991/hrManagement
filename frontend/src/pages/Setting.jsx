import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/setting';

const DEFAULT_SETTINGS = [
  { key: 'max_loan_amount', label: 'Maximum Loan Amount (Rs.)', value: '500000', type: 'number' },
  { key: 'max_loan_duration', label: 'Maximum Loan Duration (Months)', value: '60', type: 'number' },
  { key: 'default_interest_rate', label: 'Default Interest Rate (%)', value: '12', type: 'number' },
  { key: 'repayment_start_after', label: 'Repayment Starts After (Months)', value: '1', type: 'number' },
  { key: 'auto_deduct_from_salary', label: 'Auto Deduct EMI from Salary', value: 'Yes', type: 'select', options: ['Yes', 'No'] },
  { key: 'max_active_loans', label: 'Max Active Loans per Employee', value: '2', type: 'number' },
  { key: 'approval_required', label: 'Require Manager Approval', value: 'Yes', type: 'select', options: ['Yes', 'No'] },
  { key: 'notify_on_approval', label: 'Notify Employee on Approval', value: 'Yes', type: 'select', options: ['Yes', 'No'] },
];

const Setting = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
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
          setSettings(JSON.parse(latest.settings));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateSetting = (key, val) => {
    setSettings(settings.map(s => s.key === key ? { ...s, value: val } : s));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (recordId) {
        await axios.put(`${API_URL}/${recordId}`, { settings: JSON.stringify(settings) });
      } else {
        const res = await axios.post(API_URL, { settings: JSON.stringify(settings) });
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
      {saved && <Alert variant="success" className="mb-4"><i className="ti ti-check me-2"></i>Loan settings saved successfully!</Alert>}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Loan Settings</h4>
        <p className="text-muted mb-0 small">Configure loan policies and default parameters</p>
      </div>

      <Form onSubmit={handleSave}>
        <Row className="g-4">
          <Col md={8}>
            <Card className="premium-card">
              <Card.Header className="bg-transparent border-0">
                <h5 className="fw-bold mb-0"><i className="ti ti-settings me-2 text-primary"></i>Loan Configuration</h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  {settings.map(s => (
                    <Col key={s.key} md={6}>
                      <Form.Group>
                        <Form.Label className="fw-medium">{s.label}</Form.Label>
                        {s.type === 'select' ? (
                          <Form.Select value={s.value} onChange={e => updateSetting(s.key, e.target.value)}>
                            {s.options.map(o => <option key={o}>{o}</option>)}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type={s.type}
                            value={s.value}
                            onChange={e => updateSetting(s.key, e.target.value)}
                          />
                        )}
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
                <div className="d-flex gap-2 mt-4">
                  <Button variant="primary" type="submit">
                    <i className="ti ti-device-floppy me-2"></i>Update Settings
                  </Button>
                  <Button variant="outline-secondary" type="button" onClick={() => setSettings(DEFAULT_SETTINGS)}>
                    <i className="ti ti-refresh me-1"></i>Reset Defaults
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="premium-card">
              <Card.Header className="bg-transparent border-0">
                <h5 className="fw-bold mb-0"><i className="ti ti-info-circle me-2 text-info"></i>Current Values</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table size="sm" className="mb-0">
                  <tbody>
                    {settings.map(s => (
                      <tr key={s.key}>
                        <td className="py-2 px-3">
                          <small className="text-muted">{s.label.split('(')[0].trim()}</small>
                        </td>
                        <td className="py-2 px-3 text-end">
                          <span className="fw-medium text-primary small">{s.value}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Setting;
