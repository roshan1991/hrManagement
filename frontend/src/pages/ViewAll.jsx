import React, { useState } from 'react';
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';

const SUMMARY_DATA = [
  { label: 'Total Employees', value: 48, icon: 'ti-users', color: 'primary', change: '+3 this month' },
  { label: 'Present Today', value: 38, icon: 'ti-user-check', color: 'success', change: '79% attendance' },
  { label: 'On Leave', value: 5, icon: 'ti-calendar-off', color: 'warning', change: '3 pending' },
  { label: 'Late Today', value: 5, icon: 'ti-clock', color: 'danger', change: 'Needs review' },
];

const RECENT_EMPLOYEES = [
  { name: 'Rajesh Sharma', dept: 'Engineering', joined: '2022-03-15', salary: 85000, status: 'Active' },
  { name: 'Priya Thapa', dept: 'HR', joined: '2021-07-01', salary: 70000, status: 'Active' },
  { name: 'Amit Poudel', dept: 'Finance', joined: '2023-01-10', salary: 55000, status: 'Active' },
  { name: 'Sunita Gurung', dept: 'Marketing', joined: '2022-09-20', salary: 62000, status: 'Inactive' },
  { name: 'Bikash Rai', dept: 'Operations', joined: '2024-02-01', salary: 48000, status: 'Active' },
];

const DEPT_BREAKDOWN = [
  { dept: 'Engineering', count: 12, pct: 25 },
  { dept: 'HR', count: 6, pct: 12.5 },
  { dept: 'Finance', count: 8, pct: 16.7 },
  { dept: 'Marketing', count: 9, pct: 18.7 },
  { dept: 'Operations', count: 13, pct: 27.1 },
];

const ViewAll = () => {
  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Overview Dashboard</h4>
        <p className="text-muted mb-0 small">Complete overview of all HR activities</p>
      </div>

      <Row className="g-3 mb-4">
        {SUMMARY_DATA.map((s, i) => (
          <Col key={i} xs={6} xl={3}>
            <Card className={`border-0 bg-label-${s.color} h-100`}>
              <Card.Body className="p-3">
                <div className="d-flex align-items-center gap-3">
                  <div className={`rounded-circle d-flex align-items-center justify-content-center bg-${s.color} bg-opacity-10`} style={{ width: 48, height: 48 }}>
                    <i className={`ti ${s.icon} ti-md text-${s.color}`}></i>
                  </div>
                  <div>
                    <div className={`fw-bold fs-4 text-${s.color}`}>{s.value}</div>
                    <small className={`text-${s.color} d-block`}>{s.label}</small>
                    <small className="text-muted">{s.change}</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col md={8}>
          <Card className="premium-card">
            <Card.Header className="bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold mb-0">Recent Employees</h5>
              <Button variant="outline-primary" size="sm" href="/employees"><i className="ti ti-arrow-right me-1"></i>View All</Button>
            </Card.Header>
            <Card.Body className="p-0">
              <Table className="align-middle mb-0">
                <thead className="table-light">
                  <tr><th>Employee</th><th>Department</th><th>Joined</th><th>Salary</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {RECENT_EMPLOYEES.map((emp, i) => (
                    <tr key={i}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-circle bg-label-primary d-flex align-items-center justify-content-center" style={{ width: 36, height: 36, fontSize: '0.8rem', fontWeight: 700 }}>
                            {emp.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="fw-medium">{emp.name}</span>
                        </div>
                      </td>
                      <td>{emp.dept}</td>
                      <td>{emp.joined}</td>
                      <td>Rs. {emp.salary.toLocaleString()}</td>
                      <td><Badge bg={emp.status === 'Active' ? 'success' : 'secondary'} className={`bg-label-${emp.status === 'Active' ? 'success' : 'secondary'} text-${emp.status === 'Active' ? 'success' : 'secondary'}`}>{emp.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="premium-card h-100">
            <Card.Header className="bg-transparent border-0">
              <h5 className="fw-bold mb-0">Department Breakdown</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex flex-column gap-3">
                {DEPT_BREAKDOWN.map((d, i) => (
                  <div key={i}>
                    <div className="d-flex justify-content-between mb-1">
                      <small className="fw-medium">{d.dept}</small>
                      <small className="text-muted">{d.count} employees</small>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      <div
                        className="progress-bar bg-primary"
                        style={{ width: `${d.pct}%`, borderRadius: '3px' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ViewAll;
