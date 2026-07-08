import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { useBranches } from '../hooks/useBranches';

const API_URL = 'http://localhost:5000/api/department';

const Department = () => {
  const { branches } = useBranches();
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ branch_id: '', dept_name: '', dept_head_id: '', is_active: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) { console.error(err); }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({ branch_id: '', dept_name: '', dept_head_id: '', is_active: '' });
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
    } catch (err) { console.error(err); }
  };

  const handleEdit = (item) => {
    setFormData({ branch_id: item.branch_id || '', dept_name: item.dept_name || '', dept_head_id: item.dept_head_id || '', is_active: item.is_active || '' });
    setEditingId(item.id);
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Department Management</h4>
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-plus me-2"></i>Add Record
        </Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Branch</th>
            <th>Department Name</th>
            <th>Department Head</th>
            <th>Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{branches.find(b => String(b.id) === String(item.branch_id))?.name || item.branch_id || '-'}</td>
              <td>{item.dept_name || '-'}</td>
              <td>{item.dept_head_id || '-'}</td>
              <td>{item.is_active || '-'}</td>
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
          {items.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-muted">No records found. Create one!</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Record' : 'Add New Record'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Branch</Form.Label>
              <Form.Select 
                required
                value={formData.branch_id} 
                onChange={e => setFormData({...formData, branch_id: e.target.value})}
              >
                <option value="">Select Branch</option>
                {branches.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Control 
                type="text"
                value={formData.dept_name} 
                onChange={e => setFormData({...formData, dept_name: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department Head</Form.Label>
              <Form.Control 
                type="text"
                value={formData.dept_head_id} 
                onChange={e => setFormData({...formData, dept_head_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select 
                value={formData.is_active} 
                onChange={e => setFormData({...formData, is_active: e.target.value})} 
              >
                <option>Active</option>
                <option>Inactive</option>
              </Form.Select>
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

export default Department;
