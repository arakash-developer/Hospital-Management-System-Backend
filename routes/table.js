const express = require("express");
const {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} = require("../controllers/table");
const isReceiption = require("../middlewares/isreceiption");
const router = express.Router();

router.get("/", isReceiption, getTables);
router.post("/", isReceiption, createTable);
router.put("/:id", isReceiption, updateTable);
router.delete("/:id", isReceiption, deleteTable);

module.exports = router;
