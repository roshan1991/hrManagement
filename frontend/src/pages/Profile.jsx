import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Form, Button, Badge, Tab, Nav } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/profile';

const Profile = () => {
  const [profile, setProfile] = useState({
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@cyclonenepal.com',
    phone: '+977-9841000000',
    department: 'Management',
    designation: 'System Administrator',
    date_of_joining: '2022-01-01',
    address: 'Kathmandu, Nepal',
    bio: 'Senior administrator managing the HR system.',
    timezone: 'Asia/Kathmandu',
    language: 'English',
  });
  const [password, setPassword] = useState({ current: '', new_pass: '', confirm: '' });
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);

  const set = (field) => (e) => setProfile({ ...profile, [field]: e.target.value });
  const setPw = (field) => (e) => setPassword({ ...password, [field]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePwSave = (e) => {
    e.preventDefault();
    setPassword({ current: '', new_pass: '', confirm: '' });
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  };

  return (
    <div>
      {saved && <div className="alert alert-success d-flex align-items-center gap-2 mb-4"><i className="ti ti-check"></i>Profile updated successfully!</div>}

      <Row className="g-4">
        <Col md={4}>
          <Card className="premium-card text-center">
            <Card.Body className="pt-4">
              <div className="position-relative d-inline-block mb-3">
                <div className="rounded-circle bg-label-primary d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 100, height: 100, fontSize: '2.5rem', fontWeight: 700, color: 'var(--bs-primary)' }}>
                  {profile.first_name[0]}{profile.last_name[0]}
                </div>
              </div>
              <h5 className="fw-bold mb-1">{profile.first_name} {profile.last_name}</h5>
              <p className="text-muted small mb-2">{profile.designation}</p>
              <Badge bg="primary" className="bg-label-primary text-primary mb-3">{profile.department}</Badge>
              <div className="text-start border-top pt-3 mt-2">
                <div className="d-flex align-items-center gap-2 mb-2"><i className="ti ti-mail text-muted"></i><small>{profile.email}</small></div>
                <div className="d-flex align-items-center gap-2 mb-2"><i className="ti ti-phone text-muted"></i><small>{profile.phone}</small></div>
                <div className="d-flex align-items-center gap-2 mb-2"><i className="ti ti-calendar text-muted"></i><small>Joined {profile.date_of_joining}</small></div>
                <div className="d-flex align-items-center gap-2"><i className="ti ti-map-pin text-muted"></i><small>{profile.address}</small></div>
              </div>
              <Button variant="outline-primary" size="sm" className="mt-3 w-100" onClick={() => setEditMode(true)}>
                <i className="ti ti-edit me-1"></i>Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Tab.Container defaultActiveKey="details">
            <Card className="premium-card">
              <Card.Header className="bg-transparent border-0">
                <Nav variant="tabs">
                  <Nav.Item><Nav.Link eventKey="details"><i className="ti ti-user me-1"></i>Profile Details</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link eventKey="password"><i className="ti ti-lock me-1"></i>Change Password</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link eventKey="preferences"><i className="ti ti-settings me-1"></i>Preferences</Nav.Link></Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="details">
                    <Form onSubmit={handleSave}>
                      <Row className="g-3">
                        <Col md={6}><Form.Group><Form.Label>First Name</Form.Label><Form.Control value={profile.first_name} onChange={set('first_name')} disabled={!editMode} /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>Last Name</Form.Label><Form.Control value={profile.last_name} onChange={set('last_name')} disabled={!editMode} /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>Email</Form.Label><Form.Control type="email" value={profile.email} onChange={set('email')} disabled={!editMode} /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>Phone</Form.Label><Form.Control value={profile.phone} onChange={set('phone')} disabled={!editMode} /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>Department</Form.Label><Form.Control value={profile.department} onChange={set('department')} disabled={!editMode} /></Form.Group></Col>
                        <Col md={6}><Form.Group><Form.Label>Designation</Form.Label><Form.Control value={profile.designation} onChange={set('designation')} disabled={!editMode} /></Form.Group></Col>
                        <Col md={12}><Form.Group><Form.Label>Address</Form.Label><Form.Control value={profile.address} onChange={set('address')} disabled={!editMode} /></Form.Group></Col>
                        <Col md={12}><Form.Group><Form.Label>Bio</Form.Label><Form.Control as="textarea" rows={3} value={profile.bio} onChange={set('bio')} disabled={!editMode} /></Form.Group></Col>
                      </Row>
                      {editMode && (
                        <div className="d-flex gap-2 mt-3">
                          <Button variant="primary" type="submit"><i className="ti ti-device-floppy me-1"></i>Save Changes</Button>
                          <Button variant="outline-secondary" onClick={() => setEditMode(false)}>Cancel</Button>
                        </div>
                      )}
                    </Form>
                  </Tab.Pane>

                  <Tab.Pane eventKey="password">
                    {pwSaved && <div className="alert alert-success mb-3">Password changed successfully!</div>}
                    <Form onSubmit={handlePwSave}>
                      <Form.Group className="mb-3"><Form.Label>Current Password</Form.Label><Form.Control type="password" value={password.current} onChange={setPw('current')} required /></Form.Group>
                      <Form.Group className="mb-3"><Form.Label>New Password</Form.Label><Form.Control type="password" value={password.new_pass} onChange={setPw('new_pass')} required minLength={8} /></Form.Group>
                      <Form.Group className="mb-3"><Form.Label>Confirm New Password</Form.Label><Form.Control type="password" value={password.confirm} onChange={setPw('confirm')} required /></Form.Group>
                      <Button variant="primary" type="submit"><i className="ti ti-lock me-1"></i>Update Password</Button>
                    </Form>
                  </Tab.Pane>

                  <Tab.Pane eventKey="preferences">
                    <Row className="g-3">
                      <Col md={6}><Form.Group><Form.Label>Language</Form.Label><Form.Select value={profile.language} onChange={set('language')}><option>English</option><option>Nepali</option></Form.Select></Form.Group></Col>
                      <Col md={6}><Form.Group><Form.Label>Timezone</Form.Label><Form.Select value={profile.timezone} onChange={set('timezone')}><option value="Asia/Kathmandu">Asia/Kathmandu (UTC+5:45)</option><option value="UTC">UTC</option></Form.Select></Form.Group></Col>
                    </Row>
                    <Button variant="primary" className="mt-3" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }}>
                      <i className="ti ti-device-floppy me-1"></i>Save Preferences
                    </Button>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
