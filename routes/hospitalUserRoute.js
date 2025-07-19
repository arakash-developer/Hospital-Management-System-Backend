const express = require('express');
const router = express.Router();
const {
  createHospitalUser,
  getHospitalUsers,
  deleteHospitalUser
} = require('../controllers/hospitalUserController');

// Assign user to hospital
router.post('/', createHospitalUser);

// Get all users of a specific hospital
router.get('/:hospitalId', getHospitalUsers);

// Remove user from hospital (using composite key)
router.delete('/:hospitalId/:userId', deleteHospitalUser);

module.exports = router;
