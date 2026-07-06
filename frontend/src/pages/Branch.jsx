import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/branches';

const Branch = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [editingId, setEditingId] = useState(null);
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
      setError('Failed to fetch branches.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({ name: '', location: '' });
    setEditingId(null);
  };
  
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
      alert('Failed to save branch.');
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name || '', location: item.location || '' });
    setEditingId(item.id);
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert('Failed to delete branch.');
      }
    }
  };

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Branch Management</h4>
          <p className="text-muted mb-0 small">Manage company branches and locations</p>
        </div>
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-plus me-2"></i>Add Branch
        </Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td className="fw-semibold">{item.name}</td>
              <td>{item.location || '-'}</td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-2 text-primary" onClick={() => handleEdit(item)}>
                  <i className="fas fa-edit"></i>
                </Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}>
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
          {!loading && items.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">No branches found. Create one!</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Branch' : 'Add New Branch'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Branch Name <span className="text-danger">*</span></Form.Label>
              <Form.Control 
                type="text"
                required
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text"
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})} 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Branch;
