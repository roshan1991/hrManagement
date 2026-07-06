import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/view-all-projects';

const ViewAllProjects = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ branch_id: '', name: '', start_date: '', deadline: '', status: '', cost: '', priority: '', estimated_hours: '', department_ids: '', client_id: '', cover_pic: '', project_leader: '', assigned_member: '', attachments: '', description: '', email: '', contact_no: '', address: '', country: '', avatar: '' });
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
    setFormData({ branch_id: '', name: '', start_date: '', deadline: '', status: '', cost: '', priority: '', estimated_hours: '', department_ids: '', client_id: '', cover_pic: '', project_leader: '', assigned_member: '', attachments: '', description: '', email: '', contact_no: '', address: '', country: '', avatar: '' });
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
    setFormData({ branch_id: item.branch_id || '', name: item.name || '', start_date: item.start_date || '', deadline: item.deadline || '', status: item.status || '', cost: item.cost || '', priority: item.priority || '', estimated_hours: item.estimated_hours || '', department_ids: item.department_ids || '', client_id: item.client_id || '', cover_pic: item.cover_pic || '', project_leader: item.project_leader || '', assigned_member: item.assigned_member || '', attachments: item.attachments || '', description: item.description || '', email: item.email || '', contact_no: item.contact_no || '', address: item.address || '', country: item.country || '', avatar: item.avatar || '' });
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
        <h4 className="fw-bold mb-0">View All Projects Management</h4>
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-plus me-2"></i>Add Record
        </Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Branch</th>
            <th>Project Name</th>
            <th>Project Start Date</th>
            <th>Project Deadline</th>
            <th>Project Status</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.branch_id || '-'}</td>
              <td>{item.name || '-'}</td>
              <td>{item.start_date || '-'}</td>
              <td>{item.deadline || '-'}</td>
              <td>{item.status || '-'}</td>
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
              <Form.Label>Project Name</Form.Label>
              <Form.Control 
                type="text"
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Start Date</Form.Label>
              <Form.Control 
                type="date"
                value={formData.start_date} 
                onChange={e => setFormData({...formData, start_date: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Deadline</Form.Label>
              <Form.Control 
                type="date"
                value={formData.deadline} 
                onChange={e => setFormData({...formData, deadline: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Status</Form.Label>
              <Form.Control 
                type="text"
                value={formData.status} 
                onChange={e => setFormData({...formData, status: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Cost</Form.Label>
              <Form.Control 
                type="number"
                value={formData.cost} 
                onChange={e => setFormData({...formData, cost: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Control 
                type="text"
                value={formData.priority} 
                onChange={e => setFormData({...formData, priority: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estimated Hours</Form.Label>
              <Form.Control 
                type="number"
                value={formData.estimated_hours} 
                onChange={e => setFormData({...formData, estimated_hours: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control 
                type="text"
                value={formData.department_ids} 
                onChange={e => setFormData({...formData, department_ids: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Control 
                type="text"
                value={formData.client_id} 
                onChange={e => setFormData({...formData, client_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Project Logo</Form.Label>
              <Form.Control 
                type="file"
                value={formData.cover_pic} 
                onChange={e => setFormData({...formData, cover_pic: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Leader</Form.Label>
              <Form.Control 
                type="text"
                value={formData.project_leader} 
                onChange={e => setFormData({...formData, project_leader: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assign Member</Form.Label>
              <Form.Control 
                type="text"
                value={formData.assigned_member} 
                onChange={e => setFormData({...formData, assigned_member: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Branch</Form.Label>
              <Form.Control 
                type="file"
                value={formData.attachments} 
                onChange={e => setFormData({...formData, attachments: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Client Email</Form.Label>
              <Form.Control 
                type="email"
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Client Contact Number</Form.Label>
              <Form.Control 
                type="text"
                value={formData.contact_no} 
                onChange={e => setFormData({...formData, contact_no: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type="text"
                value={formData.address} 
                onChange={e => setFormData({...formData, address: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control 
                type="text"
                value={formData.country} 
                onChange={e => setFormData({...formData, country: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Client Profile</Form.Label>
              <Form.Control 
                type="file"
                value={formData.avatar} 
                onChange={e => setFormData({...formData, avatar: e.target.value})} 
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

export default ViewAllProjects;
