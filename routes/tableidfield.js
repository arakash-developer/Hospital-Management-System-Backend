const express = require("express");
const router = express.Router();
const isReceiptionist = require("../middlewares/isreceiption");
const {
  createTableIdField,
  getTableIdFields,
  getTableIdFieldById,
  updateTableIdField,
  deleteTableIdField,
} = require("../controllers/tableidfield");
router.get("/", isReceiptionist, getTableIdFields);
router.post("/", isReceiptionist, createTableIdField);
router.get("/:id", isReceiptionist, getTableIdFieldById);
router.put("/:id", isReceiptionist, updateTableIdField);
router.delete("/:id", isReceiptionist, deleteTableIdField);

module.exports = router;
