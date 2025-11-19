const express = require("express");
const router = express.Router();
const {
  departmentCreate,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department");
const isReceiption = require("../middlewares/isreceiption");

router.post("/", isReceiption, departmentCreate);
router.get("/", isReceiption, getDepartments);
router.put("/:id", isReceiption, updateDepartment);
router.delete("/:id", isReceiption, deleteDepartment);

module.exports = router;
