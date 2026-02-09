const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const { nanoid } = require('nanoid');

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const slug = `${name.toLowerCase().replace(/\s+/g,'-')}-${nanoid(6)}`;
    const g = await Group.create({ name, slug, members: [] });
    res.json(g);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const g = await Group.findOne({ slug: req.params.slug });
    if (!g) return res.status(404).json({ error: 'Not found' });
    res.json(g);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
