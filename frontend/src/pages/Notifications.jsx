import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Button, Badge, Alert, Nav, Tab } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/notifications';

const DEFAULT_SETTINGS = [
  { key: 'leave_request', label: 'Leave Requests', desc: 'Notify when new leave requests are submitted', icon: 'ti-calendar-off', enabled: true },
  { key: 'attendance_alert', label: 'Attendance Alerts', desc: 'Late arrival and absent notifications', icon: 'ti-clock', enabled: true },
  { key: 'payroll_processed', label: 'Payroll Processed', desc: 'Notify employees when payroll is run', icon: 'ti-credit-card', enabled: true },
  { key: 'birthday_reminder', label: 'Birthday Reminders', desc: 'Alert on employee birthdays', icon: 'ti-cake', enabled: false },
  { key: 'contract_expiry', label: 'Contract Expiry', desc: 'Warn 30 days before contract expiry', icon: 'ti-file-alert', enabled: true },
  { key: 'loan_approval', label: 'Loan Approvals', desc: 'Notify on loan application status change', icon: 'ti-moneybag', enabled: false },
];

const DEFAULT_NOTIFS = [
  { id: 1, type: 'Leave Request', message: 'Rajesh Sharma has submitted a leave request for Jun 10-12', time: '2 hours ago', icon: 'ti-calendar-off', color: 'warning', read: false },
  { id: 2, type: 'Attendance', message: 'Priya Thapa was marked late today (09:22 AM)', time: '4 hours ago', icon: 'ti-clock', color: 'danger', read: false },
  { id: 3, type: 'Payroll', message: 'Payroll for May 2025 has been processed successfully', time: '1 day ago', icon: 'ti-credit-card', color: 'success', read: true },
  { id: 4, type: 'Contract', message: 'Sunita Gurung\'s contract expires in 28 days', time: '2 days ago', icon: 'ti-file-alert', color: 'warning', read: true },
];

const Notifications = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFS);
  const [saved, setSaved] = useState(false);
  const [recordId, setRecordId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data && res.data.length > 0) {
        const latest = res.data[res.data.length - 1];
        setRecordId(latest.id);
        if (latest.settings) setSettings(JSON.parse(latest.settings));
        if (latest.notifications) setNotifications(JSON.parse(latest.notifications));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveState = async (newNotifs, newSettings) => {
    try {
      const data = {
        notifications: JSON.stringify(newNotifs || notifications),
        settings: JSON.stringify(newSettings || settings)
      };
      if (recordId) {
        await axios.put(`${API_URL}/${recordId}`, data);
      } else {
        const res = await axios.post(API_URL, data);
        setRecordId(res.data.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSetting = (key) => {
    const updated = settings.map(s => s.key === key ? { ...s, enabled: !s.enabled } : s);
    setSettings(updated);
    saveState(null, updated);
  };

  const markRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    saveState(updated, null);
  };

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    saveState(updated, null);
  };

  const deleteNotif = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    saveState(updated, null);
  };

  const handleSaveSettings = () => {
    saveState(null, settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Notifications</h4>
          <p className="text-muted mb-0 small">Manage notification preferences and inbox</p>
        </div>
        {unreadCount > 0 && <Badge bg="danger" className="bg-label-danger text-danger px-3 py-2">{unreadCount} Unread</Badge>}
      </div>

      <Tab.Container defaultActiveKey="inbox">
        <Nav variant="tabs" className="mb-4">
          <Nav.Item><Nav.Link eventKey="inbox"><i className="ti ti-inbox me-1"></i>Inbox {unreadCount > 0 && <Badge bg="danger" className="ms-1">{unreadCount}</Badge>}</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="settings"><i className="ti ti-settings me-1"></i>Notification Settings</Nav.Link></Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="inbox">
            <div className="d-flex justify-content-end mb-3">
              <Button variant="outline-secondary" size="sm" onClick={markAllRead}><i className="ti ti-checks me-1"></i>Mark All Read</Button>
            </div>
            <div className="d-flex flex-column gap-2">
              {notifications.map(notif => (
                <div key={notif.id} className={`d-flex align-items-start gap-3 p-3 rounded ${!notif.read ? 'bg-light border border-primary border-opacity-25' : 'border'}`} style={{ transition: 'all 0.2s' }}>
                  <div className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 bg-label-${notif.color}`} style={{ width: 44, height: 44 }}>
                    <i className={`ti ${notif.icon} text-${notif.color}`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium small">{notif.type}</span>
                      <small className="text-muted">{notif.time}</small>
                    </div>
                    <p className="mb-0 small text-muted">{notif.message}</p>
                  </div>
                  <div className="d-flex gap-1 flex-shrink-0">
                    {!notif.read && <Button variant="light" size="sm" className="text-success" onClick={() => markRead(notif.id)} title="Mark read"><i className="ti ti-check"></i></Button>}
                    <Button variant="light" size="sm" className="text-danger" onClick={() => deleteNotif(notif.id)} title="Delete"><i className="ti ti-trash"></i></Button>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="text-center py-5 text-muted">
                  <i className="ti ti-bell-off" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                  <p className="mt-2">No notifications</p>
                </div>
              )}
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="settings">
            {saved && <Alert variant="success" className="mb-3"><i className="ti ti-check me-2"></i>Notification settings saved!</Alert>}
            <div className="d-flex flex-column gap-3">
              {settings.map(s => (
                <div key={s.key} className="d-flex align-items-center justify-content-between p-3 border rounded">
                  <div className="d-flex align-items-center gap-3">
                    <i className={`ti ${s.icon} ti-md text-primary`}></i>
                    <div>
                      <div className="fw-medium">{s.label}</div>
                      <small className="text-muted">{s.desc}</small>
                    </div>
                  </div>
                  <Form.Check type="switch" checked={s.enabled} onChange={() => toggleSetting(s.key)} />
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Button variant="primary" onClick={handleSaveSettings}><i className="ti ti-device-floppy me-2"></i>Save Settings</Button>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default Notifications;
