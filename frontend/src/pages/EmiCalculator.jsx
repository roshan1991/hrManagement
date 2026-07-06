import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, Table, Badge } from 'react-bootstrap';

const EmiCalculator = () => {
  const [form, setForm] = useState({
    principal: '',
    interest_rate: '',
    duration_months: '',
    interest_type: 'flat',
  });
  const [result, setResult] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const calculate = (e) => {
    e.preventDefault();
    const P = parseFloat(form.principal);
    const r = parseFloat(form.interest_rate) / 100;
    const n = parseInt(form.duration_months);

    if (!P || !r || !n) return;

    let emi, totalInterest, totalPayable;

    if (form.interest_type === 'flat') {
      totalInterest = P * r * (n / 12);
      totalPayable = P + totalInterest;
      emi = totalPayable / n;
    } else {
      const monthlyRate = r / 12;
      emi = (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
      totalPayable = emi * n;
      totalInterest = totalPayable - P;
    }

    // Generate amortization schedule (show first 12 months)
    const sched = [];
    let balance = P;
    const monthlyRate = r / 12;
    for (let i = 1; i <= Math.min(n, 12); i++) {
      const interestPaid = form.interest_type === 'flat' ? totalInterest / n : balance * monthlyRate;
      const principalPaid = emi - interestPaid;
      balance = Math.max(0, balance - principalPaid);
      sched.push({ month: i, emi: emi.toFixed(2), interest: interestPaid.toFixed(2), principal: principalPaid.toFixed(2), balance: balance.toFixed(2) });
    }

    setResult({ emi: emi.toFixed(2), totalInterest: totalInterest.toFixed(2), totalPayable: totalPayable.toFixed(2), principal: P });
    setSchedule(sched);
  };

  const reset = () => { setForm({ principal: '', interest_rate: '', duration_months: '', interest_type: 'flat' }); setResult(null); setSchedule([]); };

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">EMI Calculator</h4>
        <p className="text-muted mb-0 small">Calculate Equated Monthly Installments for loans</p>
      </div>

      <Row className="g-4">
        <Col md={5}>
          <Card className="premium-card">
            <Card.Header className="bg-transparent border-0">
              <h5 className="fw-bold mb-0"><i className="ti ti-calculator me-2 text-primary"></i>Loan Details</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={calculate}>
                <Form.Group className="mb-3">
                  <Form.Label>Loan Amount (Rs.) <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="number" required placeholder="e.g. 500000" value={form.principal} onChange={set('principal')} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Annual Interest Rate (%)</Form.Label>
                  <Form.Control type="number" step="0.1" required placeholder="e.g. 12" value={form.interest_rate} onChange={set('interest_rate')} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Loan Duration (Months)</Form.Label>
                  <Form.Control type="number" required placeholder="e.g. 24" value={form.duration_months} onChange={set('duration_months')} />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Interest Type</Form.Label>
                  <div className="d-flex gap-3">
                    <Form.Check type="radio" label="Fixed (Flat)" name="interestType" value="flat" checked={form.interest_type === 'flat'} onChange={set('interest_type')} />
                    <Form.Check type="radio" label="Reducing Balance" name="interestType" value="reducing" checked={form.interest_type === 'reducing'} onChange={set('interest_type')} />
                  </div>
                </Form.Group>
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" className="flex-grow-1"><i className="ti ti-calculator me-1"></i>Calculate</Button>
                  <Button variant="outline-secondary" onClick={reset}><i className="ti ti-refresh"></i></Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={7}>
          {result ? (
            <>
              <Row className="g-3 mb-4">
                {[
                  { label: 'Monthly EMI', value: `Rs. ${Number(result.emi).toLocaleString()}`, color: 'primary', icon: 'ti-credit-card' },
                  { label: 'Total Interest', value: `Rs. ${Number(result.totalInterest).toLocaleString()}`, color: 'danger', icon: 'ti-trending-up' },
                  { label: 'Total Payable', value: `Rs. ${Number(result.totalPayable).toLocaleString()}`, color: 'success', icon: 'ti-currency-rupee' },
                  { label: 'Principal', value: `Rs. ${Number(result.principal).toLocaleString()}`, color: 'info', icon: 'ti-moneybag' },
                ].map((s, i) => (
                  <Col key={i} xs={6}>
                    <Card className={`border-0 bg-label-${s.color} h-100`}>
                      <Card.Body className="p-3">
                        <div className="d-flex align-items-center gap-2">
                          <i className={`ti ${s.icon} ti-md text-${s.color}`}></i>
                          <div>
                            <div className={`fw-bold text-${s.color}`}>{s.value}</div>
                            <small className={`text-${s.color}`}>{s.label}</small>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Card className="premium-card">
                <Card.Header className="bg-transparent border-0 d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold mb-0">Amortization Schedule</h6>
                  <small className="text-muted">Showing first 12 months</small>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="table-responsive">
                    <Table size="sm" className="align-middle mb-0">
                      <thead className="table-light">
                        <tr><th>Month</th><th>EMI (Rs.)</th><th>Interest</th><th>Principal</th><th>Balance</th></tr>
                      </thead>
                      <tbody>
                        {schedule.map(row => (
                          <tr key={row.month}>
                            <td><Badge bg="secondary" className="bg-label-secondary text-secondary">{row.month}</Badge></td>
                            <td className="fw-medium">{Number(row.emi).toLocaleString()}</td>
                            <td className="text-danger">{Number(row.interest).toLocaleString()}</td>
                            <td className="text-success">{Number(row.principal).toLocaleString()}</td>
                            <td>{Number(row.balance).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </>
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100" style={{ minHeight: '300px' }}>
              <div className="text-center text-muted">
                <i className="ti ti-calculator" style={{ fontSize: '4rem', opacity: 0.2 }}></i>
                <p className="mt-3">Enter loan details to calculate EMI and view amortization schedule</p>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EmiCalculator;
