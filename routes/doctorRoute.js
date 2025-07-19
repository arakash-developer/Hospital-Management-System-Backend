const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');
const { getDoctors, createDoctor } = require('../controllers/DoctorController');

router.post('/', createDoctor);
router.get('/', getDoctors);

module.exports = router;
