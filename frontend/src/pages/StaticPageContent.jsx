import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Badge, Row, Col, InputGroup } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/static-page-contents';

const StaticPageContent = () => {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ page_title: '', slug: '', content: '', last_updated_by: 'Admin' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

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
      setError('Failed to fetch static page contents.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({ page_title: '', slug: '', content: '', last_updated_by: 'Admin' });
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
    } catch (err) {
      console.error(err);
      alert('Failed to save page content.');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      page_title: item.page_title || '',
      slug: item.slug || '',
      content: item.content || '',
      last_updated_by: item.last_updated_by || 'Admin'
    });
    setEditingId(item.id);
    handleShow();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this page content?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
        alert('Failed to delete page content.');
      }
    }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const filtered = items.filter(i =>
    (`${i.page_title} ${i.slug} ${i.content}`).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="premium-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Static Page Contents</h4>
          <p className="text-muted mb-0 small">Manage text contents, FAQs, and policy pages</p>
        </div>
        <Button variant="primary" onClick={handleShow}>
          <i className="ti ti-plus me-1"></i>Create Page
        </Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="mb-3 g-2">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><i className="ti ti-search"></i></InputGroup.Text>
            <Form.Control placeholder="Search pages..." value={search} onChange={e => setSearch(e.target.value)} />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Button variant="outline-secondary" className="w-100" onClick={() => setSearch('')}>
            <i className="ti ti-refresh me-1"></i>Reset
          </Button>
        </Col>
      </Row>

      <Table responsive hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Page Title</th>
            <th>Slug / URL Path</th>
            <th>Last Updated By</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <div className="fw-semibold">{item.page_title}</div>
                <small className="text-muted d-block text-truncate" style={{ maxWidth: '300px' }}>{item.content}</small>
              </td>
              <td><code className="text-primary">/{item.slug}</code></td>
              <td>{item.last_updated_by || 'Admin'}</td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-2 text-primary" onClick={() => handleEdit(item)}>
                  <i className="ti ti-edit"></i>
                </Button>
                <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}>
                  <i className="ti ti-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
          {!loading && filtered.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-muted">No custom static pages found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Page Content' : 'Create Static Page'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Page Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control required value={formData.page_title} onChange={set('page_title')} placeholder="e.g. Terms of Service" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>URL Slug <span className="text-danger">*</span></Form.Label>
                  <Form.Control required value={formData.slug} onChange={set('slug')} placeholder="e.g. terms-of-service" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Author / Updated By</Form.Label>
                  <Form.Control value={formData.last_updated_by} onChange={set('last_updated_by')} />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Page Body Content</Form.Label>
                  <Form.Control as="textarea" rows={8} value={formData.content} onChange={set('content')} placeholder="Markdown / HTML or text contents..." />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Page</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default StaticPageContent;
