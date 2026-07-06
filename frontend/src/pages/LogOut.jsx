import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored auth tokens
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear global axios Authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
      <Card className="premium-card text-center" style={{ maxWidth: '440px', width: '100%' }}>
        <Card.Body className="p-5">
          <div className="rounded-circle bg-label-danger d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: 80, height: 80 }}>
            <i className="ti ti-logout" style={{ fontSize: '2.2rem', color: 'var(--bs-danger)' }}></i>
          </div>
          <h4 className="fw-bold mb-2">Logout</h4>
          <p className="text-muted mb-4">
            Are you sure you want to log out of the HR system? Any unsaved changes will be lost.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button variant="outline-secondary" onClick={() => navigate(-1)} className="px-4">
              <i className="ti ti-arrow-left me-2"></i>Go Back
            </Button>
            <Button variant="danger" onClick={handleLogout} className="px-4">
              <i className="ti ti-logout me-2"></i>Logout
            </Button>
          </div>
          <p className="text-muted mt-4 mb-0" style={{ fontSize: '0.8rem' }}>
            <i className="ti ti-shield-check me-1 text-success"></i>
            Your session data will be securely cleared
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LogOut;
