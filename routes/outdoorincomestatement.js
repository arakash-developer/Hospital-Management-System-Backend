const express = require('express');
const router = express.Router();
const { getPatientsByDateRange } = require('../controllers/outdoorincomestatement');
router.get('/', getPatientsByDateRange);

module.exports = router;