import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/job';

const Job = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ branch_id: '', department_id: '', categories: '', job_type_id: '', title: '', skills: '', total_opening: '', start_date: '', deadline: '', pay_by: '', min_salary: '', max_salary: '', salary: '', salary_rate: '', disclose_salary_on_site: '', job_description: '', requirements: '', benefits: '', experience: '', required_fields: '' });
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
    setFormData({ branch_id: '', department_id: '', categories: '', job_type_id: '', title: '', skills: '', total_opening: '', start_date: '', deadline: '', pay_by: '', min_salary: '', max_salary: '', salary: '', salary_rate: '', disclose_salary_on_site: '', job_description: '', requirements: '', benefits: '', experience: '', required_fields: '' });
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
    setFormData({ branch_id: item.branch_id || '', department_id: item.department_id || '', categories: item.categories || '', job_type_id: item.job_type_id || '', title: item.title || '', skills: item.skills || '', total_opening: item.total_opening || '', start_date: item.start_date || '', deadline: item.deadline || '', pay_by: item.pay_by || '', min_salary: item.min_salary || '', max_salary: item.max_salary || '', salary: item.salary || '', salary_rate: item.salary_rate || '', disclose_salary_on_site: item.disclose_salary_on_site || '', job_description: item.job_description || '', requirements: item.requirements || '', benefits: item.benefits || '', experience: item.experience || '', required_fields: item.required_fields || '' });
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
        <h4 className="fw-bold mb-0">Job Management</h4>
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
            <th>Job Category</th>
            <th>Job Type</th>
            <th>Job Title</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.branch_id || '-'}</td>
              <td>{item.department_id || '-'}</td>
              <td>{item.categories || '-'}</td>
              <td>{item.job_type_id || '-'}</td>
              <td>{item.title || '-'}</td>
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
              <Form.Label>Job Category</Form.Label>
              <Form.Control 
                type="text"
                value={formData.categories} 
                onChange={e => setFormData({...formData, categories: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Control 
                type="text"
                value={formData.job_type_id} 
                onChange={e => setFormData({...formData, job_type_id: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control 
                type="text"
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Skills</Form.Label>
              <Form.Control 
                type="text"
                value={formData.skills} 
                onChange={e => setFormData({...formData, skills: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Openings</Form.Label>
              <Form.Control 
                type="number"
                value={formData.total_opening} 
                onChange={e => setFormData({...formData, total_opening: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vacancy Start Date</Form.Label>
              <Form.Control 
                type="date"
                value={formData.start_date} 
                onChange={e => setFormData({...formData, start_date: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Application Deadline</Form.Label>
              <Form.Control 
                type="date"
                value={formData.deadline} 
                onChange={e => setFormData({...formData, deadline: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pay By</Form.Label>
              <Form.Control 
                type="text"
                value={formData.pay_by} 
                onChange={e => setFormData({...formData, pay_by: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Minimum Salary</Form.Label>
              <Form.Control 
                type="number"
                value={formData.min_salary} 
                onChange={e => setFormData({...formData, min_salary: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Maximum Salary</Form.Label>
              <Form.Control 
                type="number"
                value={formData.max_salary} 
                onChange={e => setFormData({...formData, max_salary: e.target.value})} 
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
              <Form.Label>Show Salary on website</Form.Label>
              <Form.Control 
                type="checkbox"
                value={formData.disclose_salary_on_site} 
                onChange={e => setFormData({...formData, disclose_salary_on_site: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job Description</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={formData.job_description} 
                onChange={e => setFormData({...formData, job_description: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Requirements</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={formData.requirements} 
                onChange={e => setFormData({...formData, requirements: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Benefits</Form.Label>
              <Form.Control 
                as="textarea" rows={3}
                value={formData.benefits} 
                onChange={e => setFormData({...formData, benefits: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Required Experience</Form.Label>
              <Form.Control 
                type="text"
                value={formData.experience} 
                onChange={e => setFormData({...formData, experience: e.target.value})} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Photo</Form.Label>
              <Form.Control 
                type="checkbox"
                value={formData.required_fields} 
                onChange={e => setFormData({...formData, required_fields: e.target.value})} 
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

export default Job;
