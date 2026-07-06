import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/payroll';

const Payroll = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ branch_id: '', department_id: '', year: '', salary_cycle: '', month: '', week: '', include_tds: '', include_ssf: '', include_pf: '', include_tada: '', include_advance_salary: '', attendance: '', payment_method_id: '', paid_on: '' });
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
    setFormData({ branch_id: '', department_id: '', year: '', salary_cycle: '', month: '', week: '', include_tds: '', include_ssf: '', include_pf: '', include_tada: '', include_advance_salary: '', attendance: '', payment_method_id: '', paid_on: '' });
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
    setFormData({ branch_id: item.branch_id || '', department_id: item.department_id || '', year: item.year || '', salary_cycle: item.salary_cycle || '', month: item.month || '', week: item.week || '', include_tds: item.include_tds || '', include_ssf: item.include_ssf || '', include_pf: item.include_pf || '', include_tada: item.include_tada || '', include_advance_salary: item.include_advance_salary || '', attendance: item.attendance || '', payment_method_id: item.payment_method_id || '', paid_on: item.paid_on || '' });
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
        <h4 className="fw-bold mb-0">Payroll Management</h4>
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-plus me-2"></i>Add Record
        </Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>branch_id</th>
            <th>department_id</th>
            <th>year</th>
            <th>salary_cycle</th>
            <th>month</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.branch_id || '-'}</td>
              <td>{item.department_id || '-'}</td>
              <td>{item.year || '-'}</td>
              <td>{item.salary_cycle || '-'}</td>
              <td>{item.month || '-'}</td>
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
              <Form.Label>branch_id</Form.Label>
              <Form.Control 
                type="text"
                value={formData.branch_id} 
                onChange={e => setFormData({...formData, branch_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>department_id</Form.Label>
              <Form.Control 
                type="text"
                value={formData.department_id} 
                onChange={e => setFormData({...formData, department_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>year</Form.Label>
              <Form.Control 
                type="text"
                value={formData.year} 
                onChange={e => setFormData({...formData, year: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>salary_cycle</Form.Label>
              <Form.Control 
                type="text"
                value={formData.salary_cycle} 
                onChange={e => setFormData({...formData, salary_cycle: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>month</Form.Label>
              <Form.Control 
                type="text"
                value={formData.month} 
                onChange={e => setFormData({...formData, month: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>week</Form.Label>
              <Form.Control 
                type="text"
                value={formData.week} 
                onChange={e => setFormData({...formData, week: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Include Tds</Form.Label>
              <Form.Control 
                type="checkbox"
                value={formData.include_tds} 
                onChange={e => setFormData({...formData, include_tds: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Include SSF</Form.Label>
              <Form.Control 
                type="checkbox"
                value={formData.include_ssf} 
                onChange={e => setFormData({...formData, include_ssf: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Include EPF</Form.Label>
              <Form.Control 
                type="checkbox"
                value={formData.include_pf} 
                onChange={e => setFormData({...formData, include_pf: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Include TADA</Form.Label>
              <Form.Control 
                type="checkbox"
                value={formData.include_tada} 
                onChange={e => setFormData({...formData, include_tada: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Include Advance Salary</Form.Label>
              <Form.Control 
                type="checkbox"
                value={formData.include_advance_salary} 
                onChange={e => setFormData({...formData, include_advance_salary: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Use Attendance</Form.Label>
              <Form.Control 
                type="checkbox"
                value={formData.attendance} 
                onChange={e => setFormData({...formData, attendance: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control 
                type="text"
                value={formData.payment_method_id} 
                onChange={e => setFormData({...formData, payment_method_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control 
                type="date"
                value={formData.paid_on} 
                onChange={e => setFormData({...formData, paid_on: e.target.value})} 
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

export default Payroll;
