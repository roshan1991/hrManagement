const express = require('express');
const { LeaveApproval } = require('../models');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await LeaveApproval.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await LeaveApproval.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await LeaveApproval.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    await data.update(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await LeaveApproval.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    await data.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
