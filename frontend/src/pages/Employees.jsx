import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Badge, Row, Col, InputGroup } from 'react-bootstrap';

const SAMPLE_DATA = [
  { id: 1, first_name: 'Rajesh', last_name: 'Sharma', email: 'rajesh@company.com', phone: '9841000001', department: 'Engineering', designation: 'Senior Developer', date_of_joining: '2022-03-15', base_salary: 85000, gender: 'Male', status: 'Active' },
  { id: 2, first_name: 'Priya', last_name: 'Thapa', email: 'priya@company.com', phone: '9841000002', department: 'HR', designation: 'HR Manager', date_of_joining: '2021-07-01', base_salary: 70000, gender: 'Female', status: 'Active' },
  { id: 3, first_name: 'Amit', last_name: 'Poudel', email: 'amit@company.com', phone: '9841000003', department: 'Finance', designation: 'Accountant', date_of_joining: '2023-01-10', base_salary: 55000, gender: 'Male', status: 'Active' },
  { id: 4, first_name: 'Sunita', last_name: 'Gurung', email: 'sunita@company.com', phone: '9841000004', department: 'Marketing', designation: 'Marketing Lead', date_of_joining: '2022-09-20', base_salary: 62000, gender: 'Female', status: 'Inactive' },
];

const DEPARTMENTS = ['Engineering', 'HR', 'Finance', 'Marketing', 'Operations', 'Design', 'Sales'];
const DESIGNATIONS = ['Junior Developer', 'Senior Developer', 'Team Lead', 'Manager', 'Director', 'HR Executive', 'HR Manager', 'Accountant', 'Marketing Lead', 'Sales Executive'];

const emptyForm = { first_name: '', last_name: '', email: '', phone: '', date_of_birth: '', gender: '', address: '', department: '', designation: '', date_of_joining: '', base_salary: '', status: 'Active' };

const API_URL = 'http://localhost:5000/api/employees';

const Employees = () => {
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
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');

  const handleClose = () => { setShow(false); setFormData(emptyForm); setEditingId(null); };
  const handleShow = () => setShow(true);

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

  const handleEdit = (item) => {
    setFormData({ ...item });
    setEditingId(item.id);
    handleShow();
  };

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

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const filtered = items.filter(i =>
    (`${i.first_name} ${i.last_name} ${i.email}`).toLowerCase().includes(search.toLowerCase()) &&
    (filterDept === '' || i.department === filterDept)
  );

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Employees</h4>
          <p className="text-muted mb-0 small">Manage all employee records</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" size="sm"><i className="ti ti-download me-1"></i>Export CSV</Button>
          <Button variant="primary" onClick={handleShow}><i className="ti ti-user-plus me-1"></i>Add Employee</Button>
        </div>
      </div>

      <Row className="mb-3 g-2">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><i className="ti ti-search"></i></InputGroup.Text>
            <Form.Control placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)} />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select value={filterDept} onChange={e => setFilterDept(e.target.value)}>
            <option value="">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Button variant="outline-secondary" className="w-100" onClick={() => { setSearch(''); setFilterDept(''); }}>
            <i className="ti ti-refresh me-1"></i>Reset
          </Button>
        </Col>
      </Row>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Phone</th>
            <th>Joining Date</th>
            <th>Salary</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <div className="avatar avatar-sm bg-label-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36, flexShrink: 0 }}>
                    <span className="fw-bold small">{item.first_name[0]}{item.last_name[0]}</span>
                  </div>
                  <div>
                    <div className="fw-medium">{item.first_name} {item.last_name}</div>
                    <small className="text-muted">{item.email}</small>
                  </div>
                </div>
              </td>
              <td>{item.department || '-'}</td>
              <td>{item.designation || '-'}</td>
              <td>{item.phone || '-'}</td>
              <td>{item.date_of_joining || '-'}</td>
              <td>Rs. {Number(item.base_salary || 0).toLocaleString()}</td>
              <td>
                <Badge bg={item.status === 'Active' ? 'success' : 'secondary'} className="bg-label-success text-success">
                  {item.status || 'Active'}
                </Badge>
              </td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)} title="Edit"><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)} title="Delete"><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan="9" className="text-center py-4 text-muted">No employees found.</td></tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Employee' : 'Add New Employee'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}><Form.Group><Form.Label>First Name <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.first_name} onChange={set('first_name')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Last Name <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.last_name} onChange={set('last_name')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Email <span className="text-danger">*</span></Form.Label><Form.Control type="email" required value={formData.email} onChange={set('email')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Phone</Form.Label><Form.Control value={formData.phone} onChange={set('phone')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Date of Birth</Form.Label><Form.Control type="date" value={formData.date_of_birth} onChange={set('date_of_birth')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Gender</Form.Label><Form.Select value={formData.gender} onChange={set('gender')}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Department <span className="text-danger">*</span></Form.Label><Form.Select required value={formData.department} onChange={set('department')}><option value="">Select Department</option>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Designation</Form.Label><Form.Select value={formData.designation} onChange={set('designation')}><option value="">Select Designation</option>{DESIGNATIONS.map(d => <option key={d}>{d}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Date of Joining</Form.Label><Form.Control type="date" value={formData.date_of_joining} onChange={set('date_of_joining')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Base Salary (Rs.)</Form.Label><Form.Control type="number" value={formData.base_salary} onChange={set('base_salary')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Active</option><option>Inactive</option></Form.Select></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Address</Form.Label><Form.Control as="textarea" rows={2} value={formData.address} onChange={set('address')} /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Employee</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Employees;
