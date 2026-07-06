import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table, InputGroup } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, title: 'Design homepage mockup', description: 'Create wireframes and final design for homepage', project: 'HR System Revamp', client: 'Margaret Robbins', assigned_to: 'Rajesh Sharma', start_date: '2025-06-01', deadline: '2025-06-10', priority: 'High', status: 'In Progress' },
  { id: 2, title: 'Write content for about page', description: 'Draft and finalize about page copy', project: 'Marketing Website', client: 'Contractor1 LLC', assigned_to: 'Priya Thapa', start_date: '2025-06-05', deadline: '2025-06-12', priority: 'Medium', status: 'To Do' },
  { id: 3, title: 'API Integration for mobile', description: 'Connect REST APIs for mobile app', project: 'Mobile App v2', client: 'Digital Media Group', assigned_to: 'Amit Poudel', start_date: '2025-05-20', deadline: '2025-06-05', priority: 'High', status: 'Done' },
];

const PROJECTS = ['HR System Revamp', 'Marketing Website', 'Mobile App v2'];
const CLIENTS = ['Margaret Robbins', 'Contractor1 LLC', 'Digital Media Group'];
const EMPLOYEES = ['Rajesh Sharma', 'Priya Thapa', 'Amit Poudel', 'Sunita Gurung', 'Bikash Rai'];
const statusColor = { 'To Do': 'secondary', 'In Progress': 'primary', 'Done': 'success' };
const priorityColor = { Low: 'info', Medium: 'warning', High: 'danger' };

const emptyForm = { title: '', description: '', project: '', client: '', assigned_to: '', start_date: '', deadline: '', priority: 'Medium', status: 'To Do' };

const API_URL = 'http://localhost:5000/api/tasks';

const Tasks = () => {
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
  const [filterStatus, setFilterStatus] = useState('');

  const handleClose = () => { setShow(false); setFormData(emptyForm); setEditingId(null); };
  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

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

  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterStatus === '' || i.status === filterStatus)
  );

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Tasks</h4>
          <p className="text-muted mb-0 small">Manage tasks across all projects</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-plus me-1"></i>Create Task</Button>
      </div>

      <Row className="mb-3 g-2">
        <Col md={5}>
          <InputGroup>
            <InputGroup.Text><i className="ti ti-search"></i></InputGroup.Text>
            <Form.Control placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option>To Do</option><option>In Progress</option><option>Done</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button variant="outline-secondary" className="w-100" onClick={() => { setSearch(''); setFilterStatus(''); }}>
            <i className="ti ti-refresh me-1"></i>Reset
          </Button>
        </Col>
      </Row>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Task Title</th><th>Project</th><th>Assigned To</th><th>Deadline</th><th>Priority</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {filtered.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <div className="fw-medium">{item.title}</div>
                <small className="text-muted">{item.description}</small>
              </td>
              <td><small>{item.project || '-'}</small></td>
              <td>{item.assigned_to || '-'}</td>
              <td><small>{item.deadline || '-'}</small></td>
              <td><Badge bg={priorityColor[item.priority]} className={`bg-label-${priorityColor[item.priority]} text-${priorityColor[item.priority]}`}>{item.priority}</Badge></td>
              <td><Badge bg={statusColor[item.status]} className={`bg-label-${statusColor[item.status]} text-${statusColor[item.status]}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan="8" className="text-center py-4 text-muted">No tasks found.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Task' : 'Create Task'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={12}><Form.Group><Form.Label>Task Title <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.title} onChange={set('title')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Project</Form.Label><Form.Select value={formData.project} onChange={set('project')}><option value="">Select Project</option>{PROJECTS.map(p => <option key={p}>{p}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Client</Form.Label><Form.Select value={formData.client} onChange={set('client')}><option value="">Select Client</option>{CLIENTS.map(c => <option key={c}>{c}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Assigned To</Form.Label><Form.Select value={formData.assigned_to} onChange={set('assigned_to')}><option value="">Select Employee</option>{EMPLOYEES.map(e => <option key={e}>{e}</option>)}</Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Start Date</Form.Label><Form.Control type="date" value={formData.start_date} onChange={set('start_date')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Deadline</Form.Label><Form.Control type="date" value={formData.deadline} onChange={set('deadline')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Priority</Form.Label><Form.Select value={formData.priority} onChange={set('priority')}><option>Low</option><option>Medium</option><option>High</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>To Do</option><option>In Progress</option><option>Done</option></Form.Select></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} value={formData.description} onChange={set('description')} /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Task</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Tasks;
