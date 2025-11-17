const express = require("express");
const router = express.Router();
const {
  calculateDepartmentCharges,
} = require("../controllers/departmentorderprice");
const isReceiption = require("../middlewares/isreceiption");
router.post("/", isReceiption, calculateDepartmentCharges);

module.exports = router;
