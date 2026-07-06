import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Form, Button, Table, Badge, Modal, Alert } from 'react-bootstrap';

const CURRENCIES = [
  { id: 1, code: 'NPR', name: 'Nepalese Rupee', symbol: 'Rs.', exchange_rate: 1, is_default: true, status: 'Active' },
  { id: 2, code: 'USD', name: 'US Dollar', symbol: '$', exchange_rate: 133.5, is_default: false, status: 'Active' },
  { id: 3, code: 'INR', name: 'Indian Rupee', symbol: '₹', exchange_rate: 1.6, is_default: false, status: 'Active' },
  { id: 4, code: 'EUR', name: 'Euro', symbol: '€', exchange_rate: 145.2, is_default: false, status: 'Inactive' },
];

const emptyForm = { code: '', name: '', symbol: '', exchange_rate: '', is_default: false, status: 'Active' };

const API_URL = 'http://localhost:5000/api/payment-currency';

const PaymentCurrency = () => {
  const [items, setItems] = useState(CURRENCIES);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleClose = () => { setShow(false); setFormData(emptyForm); setEditingId(null); };
  const set = (field) => (e) => setFormData({ ...formData, [field]: field === 'is_default' ? e.target.checked : e.target.value });

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

  const handleEdit = (item) => { setFormData({ ...item }); setEditingId(item.id); setShow(true); };
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
  const setDefault = (id) => setItems(items.map(i => ({ ...i, is_default: i.id === id })));

  const defaultCurrency = items.find(i => i.is_default);

  return (
    <div>
      {saved && <Alert variant="success" className="mb-4"><i className="ti ti-check me-2"></i>Currency saved!</Alert>}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Payment Currency</h4>
          <p className="text-muted mb-0 small">Manage supported currencies and exchange rates</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          {defaultCurrency && (
            <span className="text-muted small">
              Default: <strong className="text-primary">{defaultCurrency.symbol} {defaultCurrency.code}</strong>
            </span>
          )}
          <Button variant="primary" onClick={() => setShow(true)}>
            <i className="ti ti-plus me-1"></i>Add Currency
          </Button>
        </div>
      </div>

      <Table responsive hover className="align-middle premium-card">
        <thead className="table-light">
          <tr><th>#</th><th>Currency</th><th>Code</th><th>Symbol</th><th>Exchange Rate (to NPR)</th><th>Default</th><th>Status</th><th className="text-end">Actions</th></tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td className="fw-medium">{item.name}</td>
              <td><code className="text-primary">{item.code}</code></td>
              <td><span className="badge bg-label-secondary text-secondary fs-6 px-2">{item.symbol}</span></td>
              <td>1 {item.code} = <strong>Rs. {item.exchange_rate}</strong></td>
              <td>
                {item.is_default ? (
                  <Badge bg="primary" className="bg-label-primary text-primary"><i className="ti ti-star-filled me-1"></i>Default</Badge>
                ) : (
                  <Button variant="link" size="sm" className="p-0 text-muted" onClick={() => setDefault(item.id)}>
                    Set Default
                  </Button>
                )}
              </td>
              <td><Badge bg={item.status === 'Active' ? 'success' : 'secondary'} className={`bg-label-${item.status === 'Active' ? 'success' : 'secondary'} text-${item.status === 'Active' ? 'success' : 'secondary'}`}>{item.status}</Badge></td>
              <td className="text-end">
                <Button variant="light" size="sm" className="me-1 text-primary" onClick={() => handleEdit(item)}><i className="ti ti-edit"></i></Button>
                {!item.is_default && <Button variant="light" size="sm" className="text-danger" onClick={() => handleDelete(item.id)}><i className="ti ti-trash"></i></Button>}
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="8" className="text-center py-4 text-muted">No currencies configured.</td></tr>}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title>{editingId ? 'Edit Currency' : 'Add Currency'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              <Col md={6}><Form.Group><Form.Label>Currency Name <span className="text-danger">*</span></Form.Label><Form.Control required value={formData.name} onChange={set('name')} placeholder="e.g. US Dollar" /></Form.Group></Col>
              <Col md={3}><Form.Group><Form.Label>Code</Form.Label><Form.Control value={formData.code} onChange={set('code')} placeholder="USD" maxLength={5} /></Form.Group></Col>
              <Col md={3}><Form.Group><Form.Label>Symbol</Form.Label><Form.Control value={formData.symbol} onChange={set('symbol')} placeholder="$" maxLength={5} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Exchange Rate (to NPR)</Form.Label><Form.Control type="number" step="0.01" value={formData.exchange_rate} onChange={set('exchange_rate')} /></Form.Group></Col>
              <Col md={6}><Form.Group><Form.Label>Status</Form.Label><Form.Select value={formData.status} onChange={set('status')}><option>Active</option><option>Inactive</option></Form.Select></Form.Group></Col>
              <Col md={12}><Form.Check type="checkbox" label="Set as Default Currency" checked={formData.is_default} onChange={set('is_default')} /></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">Save Currency</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentCurrency;
