import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Badge, Table } from 'react-bootstrap';

const SAMPLE = [
  { id: 1, title: 'Excellent', rating: 5, description: 'Highly recommended, outstanding candidate' },
  { id: 2, title: 'Good', rating: 4, description: 'Strong recommendation with minor reservations' },
  { id: 3, title: 'Average', rating: 3, description: 'Neutral recommendation, meets basic requirements' },
  { id: 4, title: 'Below Average', rating: 2, description: 'Weak recommendation, significant gaps' },
  { id: 5, title: 'Not Recommended', rating: 1, description: 'Do not recommend for the position' },
];

const STARS = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
const ratingColor = { 5: 'success', 4: 'primary', 3: 'info', 2: 'warning', 1: 'danger' };

const emptyForm = { title: '', rating: '3', description: '' };

const API_URL = 'http://localhost:5000/api/recommendation-type';

const RecommendationType = () => {
  const [items, setItems] = useState([]);
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
      setError('Failed to fetch records.');
    } finally {
      setLoading(false);
    }
  };
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const handleClose = () => { setShow(false); setFormData(emptyForm); setEditingId(null); };
  const set = (f) => (e) => setFormData({ ...formData, [f]: e.target.value });

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
      alert('Failed to save record.');
    }
  };

  const handleEdit = (item) => { setFormData({ title: item.title, rating: String(item.rating), description: item.description }); setEditingId(item.id); setShow(true); };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert('Failed to delete record.');
      }
    }
  };

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Recommendation Types</h4>
          <p className="text-muted mb-0 small">Define recommendation categories and rating scales for interviews</p>
        </div>
        <Button variant="primary" onClick={() => setShow(true)}><i className="ti ti-plus me-1"></i>Add Recommendation Type</Button>
      </div>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr><th>#</th><th>Title</th><th>Rating</th><th>Stars</th><th>Description</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.sort((a, b) => b.rating - a.rating).map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <Badge bg={ratingColor[item.rating]} className={`bg-label-${ratingColor[item.rating]} text-${ratingColor[item.rating]} px-3`}>
                  {item.title}
                </Badge>
              </td>
              <td>
                <span className="fw-bold fs-5 text-warning">{item.rating}</span>
                <small className="text-muted"> / 5</small>
              </td>
              <td>
                <span style={{ color: '#f59e0b', fontSize: '1.1rem', letterSpacing: '1px' }}>{STARS(item.rating)}</span>
              </td>
              <td><small className="text-muted">{item.description}</small></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="6" className="text-center py-4 text-muted">No recommendation types defined.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Recommendation Type' : 'Add Recommendation Type'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title <span className="text-danger">*</span></Form.Label>
              <Form.Control required value={formData.title} onChange={set('title')} placeholder="e.g. Excellent, Good..." />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rating (1–5)</Form.Label>
              <Form.Select value={formData.rating} onChange={set('rating')}>
                {[5, 4, 3, 2, 1].map(r => (
                  <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''} — {STARS(r)}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={formData.description} onChange={set('description')} placeholder="Brief description of this recommendation level" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default RecommendationType;
