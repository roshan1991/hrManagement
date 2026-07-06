import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/job-applicant';

const JobApplicant = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ job_id: '', name: '', email: '', phone: '', expertise: '', address: '', notice_period: '', application_source: '', resume: '', cover_letter: '', photo: '', gender: '', current_ctc: '', dob: '', expected_ctc: '', terms_conditions: '' });
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
    setFormData({ job_id: '', name: '', email: '', phone: '', expertise: '', address: '', notice_period: '', application_source: '', resume: '', cover_letter: '', photo: '', gender: '', current_ctc: '', dob: '', expected_ctc: '', terms_conditions: '' });
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
    setFormData({ job_id: item.job_id || '', name: item.name || '', email: item.email || '', phone: item.phone || '', expertise: item.expertise || '', address: item.address || '', notice_period: item.notice_period || '', application_source: item.application_source || '', resume: item.resume || '', cover_letter: item.cover_letter || '', photo: item.photo || '', gender: item.gender || '', current_ctc: item.current_ctc || '', dob: item.dob || '', expected_ctc: item.expected_ctc || '', terms_conditions: item.terms_conditions || '' });
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
        <h4 className="fw-bold mb-0">Job Applicant Management</h4>
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-plus me-2"></i>Add Record
        </Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Select Job</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Current Role</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.job_id || '-'}</td>
              <td>{item.name || '-'}</td>
              <td>{item.email || '-'}</td>
              <td>{item.phone || '-'}</td>
              <td>{item.expertise || '-'}</td>
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
              <Form.Label>Select Job</Form.Label>
              <Form.Control 
                type="text"
                value={formData.job_id} 
                onChange={e => setFormData({...formData, job_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text"
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email"
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="tel"
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Current Role</Form.Label>
              <Form.Control 
                type="text"
                value={formData.expertise} 
                onChange={e => setFormData({...formData, expertise: e.target.value})} 
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
              <Form.Label>Notice Period</Form.Label>
              <Form.Control 
                type="text"
                value={formData.notice_period} 
                onChange={e => setFormData({...formData, notice_period: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>How did you hear about this job?</Form.Label>
              <Form.Control 
                type="text"
                value={formData.application_source} 
                onChange={e => setFormData({...formData, application_source: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Resume/CV</Form.Label>
              <Form.Control 
                type="file"
                value={formData.resume} 
                onChange={e => setFormData({...formData, resume: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={formData.cover_letter} 
                onChange={e => setFormData({...formData, cover_letter: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control 
                type="file"
                value={formData.photo} 
                onChange={e => setFormData({...formData, photo: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control 
                type="text"
                value={formData.gender} 
                onChange={e => setFormData({...formData, gender: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Current CTC / Salary</Form.Label>
              <Form.Control 
                type="text"
                value={formData.current_ctc} 
                onChange={e => setFormData({...formData, current_ctc: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control 
                type="date"
                value={formData.dob} 
                onChange={e => setFormData({...formData, dob: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expected Salary</Form.Label>
              <Form.Control 
                type="text"
                value={formData.expected_ctc} 
                onChange={e => setFormData({...formData, expected_ctc: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>I agree to the Terms & Conditions</Form.Label>
              <Form.Control 
                type="checkbox"
                value={formData.terms_conditions} 
                onChange={e => setFormData({...formData, terms_conditions: e.target.value})} 
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

export default JobApplicant;
