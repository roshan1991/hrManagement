import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, employee: 'Rajesh Sharma', month_year: '2025-05', basic_salary: 85000, allowances: 12000, deductions: 8500, net_salary: 88500, payment_method: 'Bank Transfer', status: 'Paid' },
  { id: 2, employee: 'Priya Thapa', month_year: '2025-05', basic_salary: 70000, allowances: 10000, deductions: 7000, net_salary: 73000, payment_method: 'Bank Transfer', status: 'Paid' },
  { id: 3, employee: 'Amit Poudel', month_year: '2025-05', basic_salary: 55000, allowances: 8000, deductions: 5500, net_salary: 57500, payment_method: 'Cash', status: 'Unpaid' },
  { id: 4, employee: 'Sunita Gurung', month_year: '2025-05', basic_salary: 62000, allowances: 9000, deductions: 6200, net_salary: 64800, payment_method: 'Bank Transfer', status: 'Unpaid' },
];

const EMPLOYEES = ['Rajesh Sharma', 'Priya Thapa', 'Amit Poudel', 'Sunita Gurung', 'Bikash Rai'];
const PAYMENT_METHODS = ['Bank Transfer', 'Cash', 'Cheque'];

const emptyForm = { employee: '', month_year: '', basic_salary: '', allowances: '', deductions: '', net_salary: '', payment_method: 'Bank Transfer', status: 'Unpaid' };

const API_URL = 'http://localhost:5000/api/employee-salary';

const EmployeeSalary = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch records.');
    } finally {
      setLoading(false);
    }
  };
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const handleClose = () => { setShow(false); setFormData(emptyForm); setEditingId(null); };
  const set = (field) => (e) => {
    const newData = { ...formData, [field]: e.target.value };
    if (['basic_salary', 'allowances', 'deductions'].includes(field)) {
      const bs = parseFloat(field === 'basic_salary' ? e.target.value : formData.basic_salary) || 0;
      const al = parseFloat(field === 'allowances' ? e.target.value : formData.allowances) || 0;
      const ded = parseFloat(field === 'deductions' ? e.target.value : formData.deductions) || 0;
      newData.net_salary = bs + al - ded;
    }
    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchItems();
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save record.');
    }
  };

  const handleEdit = (item) => { setFormData({ ...item }); setEditingId(item.id); setShow(true); };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert('Failed to delete record.');
      }
    }
  };

  const totalPaid = items.filter(i => i.status === 'Paid').reduce((sum, i) => sum + Number(i.net_salary), 0);
  const totalUnpaid = items.filter(i => i.status === 'Unpaid').reduce((sum, i) => sum + Number(i.net_salary), 0);

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Employee Salary</h4>
          <p className="text-muted mb-0 small">Manage individual employee salary details</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-plus me-1"></i>Add Salary</Button>
      </div>

      <Row className="mb-4 g-3">
        {[
          { label: 'Total Payable', value: `Rs. ${(totalPaid + totalUnpaid).toLocaleString()}`, color: 'primary', icon: 'ti-currency-rupee' },
          { label: 'Paid', value: `Rs. ${totalPaid.toLocaleString()}`, color: 'success', icon: 'ti-circle-check' },
          { label: 'Unpaid', value: `Rs. ${totalUnpaid.toLocaleString()}`, color: 'warning', icon: 'ti-clock' },
          { label: 'Employees', value: items.length, color: 'info', icon: 'ti-users' },
        ].map((s, i) => (
          <Col key={i} xs={6} md={3}>
            <div className={`card border-0 bg-label-${s.color} h-100`}>
              <div className="card-body d-flex align-items-center gap-2 p-3">
                <i className={`ti ${s.icon} ti-lg text-${s.color}`}></i>
                <div>
                  <div className={`fw-bold text-${s.color}`}>{s.value}</div>
                  <small className={`text-${s.color}`}>{s.label}</small>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Employee</th><th>Month/Year</th><th>Basic (Rs.)</th><th>Allowances</th><th>Deductions</th><th>Net (Rs.)</th><th>Method</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td className="fw-medium">{item.employee}</td>
              <td>{item.month_year || '-'}</td>
              <td>{Number(item.basic_salary).toLocaleString()}</td>
              <td className="text-success">+{Number(item.allowances).toLocaleString()}</td>
              <td className="text-danger">-{Number(item.deductions).toLocaleString()}</td>
              <td className="fw-bold">{Number(item.net_salary).toLocaleString()}</td>
              <td>{item.payment_method}</td>
              <td>
                <Badge bg={item.status === 'Paid' ? 'success' : 'warning'} className={`bg-label-${item.status === 'Paid' ? 'success' : 'warning'} text-${item.status === 'Paid' ? 'success' : 'warning'}`}>
                  {item.status}
                </Badge>
              </td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="10" className="text-center py-4 text-muted">No salary records found.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Salary' : 'Add Salary Record'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}><Form.Group><Form.Label>Employee <span className="text-danger">*</span></Form.Label><Form.Select required value={formData.employee} onChange={set('employee')}><option value="">Select Employee</option>{EMPLOYEES.map(e => <option key={e}>{e}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Month/Year</Form.Label><Form.Control type="month" value={formData.month_year} onChange={set('month_year')} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Basic Salary (Rs.)</Form.Label><Form.Control type="number" value={formData.basic_salary} onChange={set('basic_salary')} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Allowances (Rs.)</Form.Label><Form.Control type="number" value={formData.allowances} onChange={set('allowances')} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Deductions (Rs.)</Form.Label><Form.Control type="number" value={formData.deductions} onChange={set('deductions')} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Net Salary (Rs.)</Form.Label><Form.Control type="number" value={formData.net_salary} onChange={set('net_salary')} className="fw-bold" /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Payment Method</Form.Label><Form.Select value={formData.payment_method} onChange={set('payment_method')}>{PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}</Form.Select></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Unpaid</option><option>Paid</option></Form.Select></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Salary</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeSalary;
