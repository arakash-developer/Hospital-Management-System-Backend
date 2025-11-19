const express = require('express');
const {getPatientsByDate} = require('../controllers/report');
const isreceiption  = require('../middlewares/isreceiption');
const router = express.Router();

router.get('/',isreceiption, getPatientsByDate);
module.exports = router;