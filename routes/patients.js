const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Get all patients
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM patients ORDER BY patient_id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
