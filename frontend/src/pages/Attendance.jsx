import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/attendance';

const Attendance = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ attendance_date: '', branch_id: '', department_id: '', check_in_at: '', check_out_at: '', edit_remark: '', night_checkin: '', night_checkout: '' });
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
    setFormData({ attendance_date: '', branch_id: '', department_id: '', check_in_at: '', check_out_at: '', edit_remark: '', night_checkin: '', night_checkout: '' });
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
    setFormData({ attendance_date: item.attendance_date || '', branch_id: item.branch_id || '', department_id: item.department_id || '', check_in_at: item.check_in_at || '', check_out_at: item.check_out_at || '', edit_remark: item.edit_remark || '', night_checkin: item.night_checkin || '', night_checkout: item.night_checkout || '' });
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
        <h4 className="fw-bold mb-0">Attendance Management</h4>
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-plus me-2"></i>Add Record
        </Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>attendance_date</th>
            <th>branch_id</th>
            <th>department_id</th>
            <th>Check In At</th>
            <th>Check In At</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.attendance_date || '-'}</td>
              <td>{item.branch_id || '-'}</td>
              <td>{item.department_id || '-'}</td>
              <td>{item.check_in_at || '-'}</td>
              <td>{item.check_out_at || '-'}</td>
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
              <Form.Label>attendance_date</Form.Label>
              <Form.Control 
                type="date"
                value={formData.attendance_date} 
                onChange={e => setFormData({...formData, attendance_date: e.target.value})} 
              />
            </Form.Group>
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
              <Form.Label>Check In At</Form.Label>
              <Form.Control 
                type="time"
                value={formData.check_in_at} 
                onChange={e => setFormData({...formData, check_in_at: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Check In At</Form.Label>
              <Form.Control 
                type="time"
                value={formData.check_out_at} 
                onChange={e => setFormData({...formData, check_out_at: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Check In At</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={formData.edit_remark} 
                onChange={e => setFormData({...formData, edit_remark: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Check In At</Form.Label>
              <Form.Control 
                type="datetime-local"
                value={formData.night_checkin} 
                onChange={e => setFormData({...formData, night_checkin: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Check Out At</Form.Label>
              <Form.Control 
                type="datetime-local"
                value={formData.night_checkout} 
                onChange={e => setFormData({...formData, night_checkout: e.target.value})} 
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

export default Attendance;
