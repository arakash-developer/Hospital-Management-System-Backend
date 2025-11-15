const express = require("express");
const router = express.Router();
const {
  departmentCreate,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department");

router.post("/", departmentCreate);
router.get("/", getDepartments);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

module.exports = router;
