import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/awards';

const Awards = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ branch_id: '', department_id: '', employee_id: '', award_type_id: '', gift_item: '', award_base: '', awarded_date: '', awarded_by: '', award_description: '', gift_description: '', attachment: '', reward_code: '' });
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
    setFormData({ branch_id: '', department_id: '', employee_id: '', award_type_id: '', gift_item: '', award_base: '', awarded_date: '', awarded_by: '', award_description: '', gift_description: '', attachment: '', reward_code: '' });
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
    setFormData({ branch_id: item.branch_id || '', department_id: item.department_id || '', employee_id: item.employee_id || '', award_type_id: item.award_type_id || '', gift_item: item.gift_item || '', award_base: item.award_base || '', awarded_date: item.awarded_date || '', awarded_by: item.awarded_by || '', award_description: item.award_description || '', gift_description: item.gift_description || '', attachment: item.attachment || '', reward_code: item.reward_code || '' });
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
        <h4 className="fw-bold mb-0">Awards Management</h4>
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
            <th>Award Name</th>
            <th>Gift item</th>
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
              <td>{item.award_type_id || '-'}</td>
              <td>{item.gift_item || '-'}</td>
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
              <Form.Label>Award Name</Form.Label>
              <Form.Control 
                type="text"
                value={formData.award_type_id} 
                onChange={e => setFormData({...formData, award_type_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gift item</Form.Label>
              <Form.Control 
                type="text"
                value={formData.gift_item} 
                onChange={e => setFormData({...formData, gift_item: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Award Base</Form.Label>
              <Form.Control 
                type="text"
                value={formData.award_base} 
                onChange={e => setFormData({...formData, award_base: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Awarded Date</Form.Label>
              <Form.Control 
                type="date"
                value={formData.awarded_date} 
                onChange={e => setFormData({...formData, awarded_date: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Awarded By</Form.Label>
              <Form.Control 
                type="text"
                value={formData.awarded_by} 
                onChange={e => setFormData({...formData, awarded_by: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Award Description</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={formData.award_description} 
                onChange={e => setFormData({...formData, award_description: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gift Description</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={formData.gift_description} 
                onChange={e => setFormData({...formData, gift_description: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Attachments</Form.Label>
              <Form.Control 
                type="file"
                value={formData.attachment} 
                onChange={e => setFormData({...formData, attachment: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Reward Code</Form.Label>
              <Form.Control 
                type="text"
                value={formData.reward_code} 
                onChange={e => setFormData({...formData, reward_code: e.target.value})} 
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

export default Awards;
