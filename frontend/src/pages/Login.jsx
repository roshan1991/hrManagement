import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, InputGroup, Alert, Spinner } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/auth/login';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(API_URL, { username, password });
      
      // Store token and user metadata in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Configure default header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || 
        'Could not connect to the authentication server. Please verify your connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center" 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        overflowY: 'auto'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'rgba(99, 102, 241, 0.15)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '350px',
          height: '350px',
          background: 'rgba(236, 72, 153, 0.12)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 1
        }}
      />

      <Card 
        className="p-3 border-0 text-white" 
        style={{ 
          maxWidth: '450px', 
          width: '90%', 
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <Card.Body className="p-4 p-sm-5">
          {/* Logo / Header */}
          <div className="text-center mb-5">
            <div 
              className="d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                borderRadius: '16px',
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
              }}
            >
              <i className="ti ti-shield-lock" style={{ fontSize: '2rem', color: '#fff' }}></i>
            </div>
            <h3 className="fw-bold mb-1" style={{ letterSpacing: '-0.5px' }}>Digital HR</h3>
            <p className="text-muted small">Sign in to manage your workplace workspace</p>
          </div>

          {error && (
            <Alert 
              variant="danger" 
              className="py-2 px-3 border-0 text-white mb-4 d-flex align-items-center gap-2"
              style={{ background: 'rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}
            >
              <i className="ti ti-alert-triangle fs-5 text-danger"></i>
              <span className="small">{error}</span>
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-4">
              <Form.Label className="small text-muted mb-2">Username or Email</Form.Label>
              <InputGroup 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s'
                }}
                className="hr-login-input-group"
              >
                <InputGroup.Text 
                  className="bg-transparent border-0 text-muted px-3"
                >
                  <i className="ti ti-user fs-5"></i>
                </InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder="Enter username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-transparent border-0 text-white py-2 shadow-none placeholder-muted"
                  style={{ fontSize: '0.95rem' }}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small text-muted mb-2">Password</Form.Label>
              <InputGroup 
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s'
                }}
                className="hr-login-input-group"
              >
                <InputGroup.Text 
                  className="bg-transparent border-0 text-muted px-3"
                >
                  <i className="ti ti-lock fs-5"></i>
                </InputGroup.Text>
                <Form.Control 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent border-0 text-white py-2 shadow-none placeholder-muted"
                  style={{ fontSize: '0.95rem' }}
                />
                <Button 
                  variant="outline-link" 
                  className="border-0 text-muted px-3 py-0 shadow-none d-flex align-items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`ti ${showPassword ? 'ti-eye-off' : 'ti-eye'} fs-5`}></i>
                </Button>
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <Form.Check 
                type="checkbox" 
                id="remember-me" 
                label="Remember me" 
                className="small text-muted cursor-pointer"
                style={{ fontSize: '0.85rem' }}
              />
              <a 
                href="#" 
                className="small text-decoration-none" 
                style={{ color: '#818cf8', fontSize: '0.85rem' }}
              >
                Forgot Password?
              </a>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-100 py-2 border-0 fw-semibold text-white d-flex align-items-center justify-content-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                borderRadius: '12px',
                height: '46px',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.25)',
                transition: 'transform 0.25s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.01)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" variant="light" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <i className="ti ti-arrow-right fs-5"></i>
                </>
              )}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <span className="small text-muted">Demo Credentials: <code>admin</code> / <code>admin123</code></span>
          </div>
        </Card.Body>
      </Card>
      
      {/* Custom Styles */}
      <style>{`
        .hr-login-input-group:focus-within {
          border-color: rgba(99, 102, 241, 0.5) !important;
          box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.25);
        }
        .placeholder-muted::placeholder {
          color: rgba(255, 255, 255, 0.3) !important;
        }
      `}</style>
    </div>
  );
};

export default Login;
