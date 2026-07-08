import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/resignation';

const Resignation = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ branch_id: '', department_id: '', employee_id: '', resignation_date: '', last_working_day: '', reason: '', document: '', status: '' });
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
    setFormData({ branch_id: '', department_id: '', employee_id: '', resignation_date: '', last_working_day: '', reason: '', document: '', status: '' });
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
    setFormData({ branch_id: item.branch_id || '', department_id: item.department_id || '', employee_id: item.employee_id || '', resignation_date: item.resignation_date || '', last_working_day: item.last_working_day || '', reason: item.reason || '', document: item.document || '', status: item.status || '' });
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
        <h4 className="fw-bold mb-0">Resignation Management</h4>
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-plus me-2"></i>Add Record
        </Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Branch</th>
            <th>Department</th>
            <th>Employee</th>
            <th>Resignation Date</th>
            <th>Last Working Date</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.branch_id || '-'}</td>
              <td>{item.department_id || '-'}</td>
              <td>{item.employee_id || '-'}</td>
              <td>{item.resignation_date || '-'}</td>
              <td>{item.last_working_day || '-'}</td>
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
              <td colSpan="7" className="text-center py-4 text-muted">No records found. Create one!</td>
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
              <Form.Control 
                type="text"
                value={formData.branch_id} 
                onChange={e => setFormData({...formData, branch_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control 
                type="text"
                value={formData.department_id} 
                onChange={e => setFormData({...formData, department_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Employee</Form.Label>
              <Form.Control 
                type="text"
                value={formData.employee_id} 
                onChange={e => setFormData({...formData, employee_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Resignation Date</Form.Label>
              <Form.Control 
                type="date"
                value={formData.resignation_date} 
                onChange={e => setFormData({...formData, resignation_date: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Working Date</Form.Label>
              <Form.Control 
                type="date"
                value={formData.last_working_day} 
                onChange={e => setFormData({...formData, last_working_day: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={formData.reason} 
                onChange={e => setFormData({...formData, reason: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Document</Form.Label>
              <Form.Control 
                type="file"
                value={formData.document} 
                onChange={e => setFormData({...formData, document: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select 
                value={formData.status} 
                onChange={e => setFormData({...formData, status: e.target.value})} 
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
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

export default Resignation;
