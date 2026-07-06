import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/job-offer';

const JobOffer = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ job_id: '', applicant_id: '', expiry_date: '', joining_date: '', salary: '', salary_rate: '', description: '', benefits: '', offer_letter: '' });
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
    setFormData({ job_id: '', applicant_id: '', expiry_date: '', joining_date: '', salary: '', salary_rate: '', description: '', benefits: '', offer_letter: '' });
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
    setFormData({ job_id: item.job_id || '', applicant_id: item.applicant_id || '', expiry_date: item.expiry_date || '', joining_date: item.joining_date || '', salary: item.salary || '', salary_rate: item.salary_rate || '', description: item.description || '', benefits: item.benefits || '', offer_letter: item.offer_letter || '' });
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
        <h4 className="fw-bold mb-0">Job Offer Management</h4>
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-plus me-2"></i>Add Record
        </Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Job</th>
            <th>Applicant</th>
            <th>Offer Expiry Date</th>
            <th>Expected Joining Date</th>
            <th>Salary</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.job_id || '-'}</td>
              <td>{item.applicant_id || '-'}</td>
              <td>{item.expiry_date || '-'}</td>
              <td>{item.joining_date || '-'}</td>
              <td>{item.salary || '-'}</td>
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
              <Form.Label>Job</Form.Label>
              <Form.Control 
                type="text"
                value={formData.job_id} 
                onChange={e => setFormData({...formData, job_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Applicant</Form.Label>
              <Form.Control 
                type="text"
                value={formData.applicant_id} 
                onChange={e => setFormData({...formData, applicant_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Offer Expiry Date</Form.Label>
              <Form.Control 
                type="date"
                value={formData.expiry_date} 
                onChange={e => setFormData({...formData, expiry_date: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expected Joining Date</Form.Label>
              <Form.Control 
                type="date"
                value={formData.joining_date} 
                onChange={e => setFormData({...formData, joining_date: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control 
                type="number"
                value={formData.salary} 
                onChange={e => setFormData({...formData, salary: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary Rate</Form.Label>
              <Form.Control 
                type="text"
                value={formData.salary_rate} 
                onChange={e => setFormData({...formData, salary_rate: e.target.value})} 
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
              <Form.Label>Benefits / Perks</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={formData.benefits} 
                onChange={e => setFormData({...formData, benefits: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Offer Letter (PDF/Doc)</Form.Label>
              <Form.Control 
                type="file"
                value={formData.offer_letter} 
                onChange={e => setFormData({...formData, offer_letter: e.target.value})} 
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

export default JobOffer;
