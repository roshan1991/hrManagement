import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Table, Badge, Button } from 'react-bootstrap';

// Margaret Robbins is a client detail view page (client ID = 1)
const DEFAULT_CLIENT = {
  id: 1,
  name: 'Margaret Robbins',
  company: 'Tech Solutions Inc.',
  email: 'margaret@techsolutions.com',
  phone: '+977-9841001001',
  address: 'New Baneshwor, Kathmandu, Nepal',
  status: 'Active',
  since: '2023-01-15',
  total_projects: 3,
  total_billed: 450000,
};

const PROJECTS = [
  { id: 1, title: 'HR System Revamp', start: '2025-05-01', deadline: '2025-08-31', status: 'In Progress', value: 200000 },
  { id: 2, title: 'Payroll Module', start: '2024-11-01', deadline: '2025-02-28', status: 'Done', value: 150000 },
  { id: 3, title: 'Employee Portal', start: '2025-09-01', deadline: '2025-12-31', status: 'To Do', value: 100000 },
];

const statusColor = { 'In Progress': 'primary', 'Done': 'success', 'To Do': 'secondary' };

const MargaretRobbins = () => {
  const [client, setClient] = useState(DEFAULT_CLIENT);
  const navigate = () => window.history.back();

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clients/1');
      if (res.data) {
        setClient({
          ...DEFAULT_CLIENT,
          ...res.data,
          name: res.data.client_name || res.data.name || DEFAULT_CLIENT.name
        });
      }
    } catch (err) {
      console.log('Using default client fallback data');
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Button variant="outline-secondary" size="sm" onClick={navigate}>
          <i className="ti ti-arrow-left me-1"></i>Back
        </Button>
        <div>
          <h4 className="fw-bold mb-0">Client Detail</h4>
          <p className="text-muted mb-0 small">Viewing client profile and projects</p>
        </div>
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card className="premium-card">
            <Card.Body className="text-center p-4">
              <div className="rounded-circle bg-label-primary d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
                <span className="fw-bold text-primary" style={{ fontSize: '1.8rem' }}>MR</span>
              </div>
              <h5 className="fw-bold mb-1">{client.name}</h5>
              <p className="text-muted small mb-2">{client.company}</p>
              <Badge bg="success" className="bg-label-success text-success mb-3">{client.status}</Badge>
              <div className="text-start border-top pt-3">
                <div className="d-flex gap-2 mb-2 align-items-center"><i className="ti ti-mail text-muted"></i><small>{client.email}</small></div>
                <div className="d-flex gap-2 mb-2 align-items-center"><i className="ti ti-phone text-muted"></i><small>{client.phone}</small></div>
                <div className="d-flex gap-2 mb-2 align-items-center"><i className="ti ti-map-pin text-muted"></i><small>{client.address}</small></div>
                <div className="d-flex gap-2 align-items-center"><i className="ti ti-calendar text-muted"></i><small>Client since {client.since}</small></div>
              </div>
            </Card.Body>
          </Card>

          <Row className="g-3 mt-0">
            {[
              { label: 'Projects', value: client.total_projects, color: 'primary', icon: 'ti-layout-kanban' },
              { label: 'Total Billed', value: `Rs. ${client.total_billed.toLocaleString()}`, color: 'success', icon: 'ti-currency-rupee' },
            ].map((s, i) => (
              <Col key={i} xs={6}>
                <Card className={`border-0 bg-label-${s.color}`}>
                  <Card.Body className="p-3 text-center">
                    <i className={`ti ${s.icon} ti-lg text-${s.color} mb-1 d-block`}></i>
                    <div className={`fw-bold text-${s.color}`}>{s.value}</div>
                    <small className={`text-${s.color}`}>{s.label}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={8}>
          <Card className="premium-card">
            <Card.Header className="bg-transparent border-0">
              <h5 className="fw-bold mb-0">Associated Projects</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table className="align-middle mb-0">
                <thead className="table-light">
                  <tr><th>#</th><th>Project</th><th>Start Date</th><th>Deadline</th><th>Value (Rs.)</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {PROJECTS.map((p, i) => (
                    <tr key={p.id}>
                      <td>{i + 1}</td>
                      <td className="fw-medium">{p.title}</td>
                      <td>{p.start}</td>
                      <td>{p.deadline}</td>
                      <td>{p.value.toLocaleString()}</td>
                      <td><Badge bg={statusColor[p.status]} className={`bg-label-${statusColor[p.status]} text-${statusColor[p.status]}`}>{p.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MargaretRobbins;
