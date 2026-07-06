import React from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';

const CycloneNepal = () => {
  const services = [
    { icon: 'ti-code', title: 'Software Development', desc: 'Custom enterprise software, web & mobile applications' },
    { icon: 'ti-device-laptop', title: 'IT Consulting', desc: 'Digital transformation strategy and technology advisory' },
    { icon: 'ti-cloud', title: 'Cloud Solutions', desc: 'AWS, Azure & GCP deployment and management services' },
    { icon: 'ti-shield', title: 'Cybersecurity', desc: 'Penetration testing, audits and security infrastructure' },
    { icon: 'ti-chart-bar', title: 'Data Analytics', desc: 'Business intelligence, dashboards and data insights' },
    { icon: 'ti-users', title: 'HR Technology', desc: 'Digital HR systems, payroll automation and workflows' },
  ];

  const stats = [
    { label: 'Years Experience', value: '10+', icon: 'ti-calendar', color: 'primary' },
    { label: 'Clients Served', value: '200+', icon: 'ti-users', color: 'success' },
    { label: 'Projects Completed', value: '500+', icon: 'ti-layout-kanban', color: 'info' },
    { label: 'Team Members', value: '50+', icon: 'ti-user-check', color: 'warning' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Card className="border-0 mb-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d6a4f 100%)' }}>
        <Card.Body className="p-5 text-white">
          <Row className="align-items-center">
            <Col md={7}>
              <Badge bg="light" className="text-primary mb-3 px-3 py-2">About the Company</Badge>
              <h2 className="fw-bold mb-3">Cyclone Nepal IT Solutions</h2>
              <p className="mb-4" style={{ opacity: 0.85, fontSize: '1.05rem' }}>
                A leading IT company in Nepal providing innovative software solutions, digital transformation services,
                and technology consulting to businesses across various sectors.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a href="https://cninfotech.com" target="_blank" rel="noreferrer" className="btn btn-light btn-sm">
                  <i className="ti ti-external-link me-1"></i>Visit Website
                </a>
                <a href="mailto:info@cninfotech.com" className="btn btn-outline-light btn-sm">
                  <i className="ti ti-mail me-1"></i>Contact Us
                </a>
              </div>
            </Col>
            <Col md={5} className="text-center d-none d-md-block">
              <div className="d-flex align-items-center justify-content-center" style={{ height: '160px' }}>
                <i className="ti ti-tornado" style={{ fontSize: '8rem', opacity: 0.4 }}></i>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Stats */}
      <Row className="g-3 mb-4">
        {stats.map((s, i) => (
          <Col key={i} xs={6} md={3}>
            <Card className={`border-0 bg-label-${s.color} h-100`}>
              <Card.Body className="text-center p-3">
                <i className={`ti ${s.icon} ti-lg text-${s.color} mb-2 d-block`}></i>
                <div className={`fw-bold fs-3 text-${s.color}`}>{s.value}</div>
                <small className={`text-${s.color}`}>{s.label}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Services */}
      <Card className="premium-card mb-4">
        <Card.Header className="bg-transparent border-0">
          <h5 className="fw-bold mb-0"><i className="ti ti-briefcase me-2 text-primary"></i>Our Services</h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            {services.map((s, i) => (
              <Col key={i} md={6} xl={4}>
                <div className="d-flex gap-3 p-3 border rounded h-100" style={{ transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--bs-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = ''}>
                  <div className="rounded-circle bg-label-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 44, height: 44 }}>
                    <i className={`ti ${s.icon} text-primary`}></i>
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-1">{s.title}</h6>
                    <small className="text-muted">{s.desc}</small>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Contact */}
      <Card className="premium-card">
        <Card.Header className="bg-transparent border-0">
          <h5 className="fw-bold mb-0"><i className="ti ti-map-pin me-2 text-primary"></i>Contact Information</h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            {[
              { icon: 'ti-globe', label: 'Website', value: 'www.cninfotech.com' },
              { icon: 'ti-mail', label: 'Email', value: 'info@cninfotech.com' },
              { icon: 'ti-phone', label: 'Phone', value: '+977-1-4XXXXXX' },
              { icon: 'ti-map-pin', label: 'Address', value: 'Kathmandu, Nepal' },
            ].map((c, i) => (
              <Col key={i} md={6} lg={3}>
                <div className="d-flex align-items-center gap-2">
                  <i className={`ti ${c.icon} text-primary`}></i>
                  <div>
                    <small className="text-muted d-block">{c.label}</small>
                    <span className="fw-medium small">{c.value}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CycloneNepal;
