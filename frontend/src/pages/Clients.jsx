import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Row, Col, Table, InputGroup } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, client_name: 'Margaret Robbins', company: 'Tech Solutions Inc.', email: 'margaret@techsolutions.com', phone: '9841001001', address: 'Kathmandu, Nepal', status: 'Active' },
  { id: 2, client_name: 'Contractor1 LLC', company: 'Build & Co.', email: 'contact@buildco.com', phone: '9841001002', address: 'Lalitpur, Nepal', status: 'Active' },
  { id: 3, client_name: 'Digital Media Group', company: 'Media Corp.', email: 'info@mediacorp.com', phone: '9841001003', address: 'Bhaktapur, Nepal', status: 'Inactive' },
];

const emptyForm = { client_name: '', company: '', email: '', phone: '', address: '', status: 'Active' };

const API_URL = 'http://localhost:5000/api/clients';

const Clients = () => {
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
    (`${i.client_name} ${i.company} ${i.email}`).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Clients</h4>
          <p className="text-muted mb-0 small">Manage client and contractor accounts</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-user-plus me-1"></i>Add Client</Button>
      </div>

      <Row className="mb-3 g-2">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><i className="ti ti-search"></i></InputGroup.Text>
            <Form.Control placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Button variant="outline-secondary" className="w-100" onClick={() => setSearch('')}><i className="ti ti-refresh me-1"></i>Reset</Button>
        </Col>
      </Row>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Client Name</th><th>Company</th><th>Email</th><th>Phone</th><th>Address</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {filtered.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td className="fw-medium">{item.client_name}</td>
              <td>{item.company || '-'}</td>
              <td>{item.email || '-'}</td>
              <td>{item.phone || '-'}</td>
              <td>{item.address || '-'}</td>
              <td><Badge bg={item.status === 'Active' ? 'success' : 'secondary'} className={`bg-label-${item.status === 'Active' ? 'success' : 'secondary'} text-${item.status === 'Active' ? 'success' : 'secondary'}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan="8" className="text-center py-4 text-muted">No clients found.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Client' : 'Add New Client'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}><Form.Group><Form.Label>Client Name <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.client_name} onChange={set('client_name')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Company</Form.Label><Form.Control value={formData.company} onChange={set('company')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Email</Form.Label><Form.Control type="email" value={formData.email} onChange={set('email')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Phone</Form.Label><Form.Control value={formData.phone} onChange={set('phone')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Active</option><option>Inactive</option></Form.Select></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Contract Document</Form.Label><Form.Control type="file" /></Form.Group></Col>
              <Col md={12}><Form.Group><Form.Label>Address</Form.Label><Form.Control as="textarea" rows={2} value={formData.address} onChange={set('address')} /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Client</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Clients;
