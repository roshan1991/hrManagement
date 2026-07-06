const express = require('express');
const { Company, Branch, Department, Post } = require('../models');

const router = express.Router();

// Generate generic CRUD functions
const generateCrud = (Model) => {
  const r = express.Router();
  r.get('/', async (req, res) => {
    try {
      const data = await Model.findAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  r.post('/', async (req, res) => {
    try {
      const data = await Model.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  r.put('/:id', async (req, res) => {
    try {
      const data = await Model.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'Not found' });
      await data.update(req.body);
      res.json(data);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  r.delete('/:id', async (req, res) => {
    try {
      const data = await Model.findByPk(req.params.id);
      if (!data) return res.status(404).json({ error: 'Not found' });
      await data.destroy();
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  return r;
};

router.use('/companies', generateCrud(Company));
router.use('/branches', generateCrud(Branch));
router.use('/departments', generateCrud(Department));
router.use('/posts', generateCrud(Post));

module.exports = router;
