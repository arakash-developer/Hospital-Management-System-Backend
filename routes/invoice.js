const express = require("express");
const router = express.Router();
const isreceiption = require("../middlewares/isreceiption");
const {
  getAllInvoices,
  getInvoiceById,
  getInvoiceByPatientId,
} = require("../controllers/invoice");

// Route to get all invoices
router.get("/", isreceiption, getAllInvoices);
// Route to get invoice by ID
router.get("/:id", isreceiption, getInvoiceById);

// Route to get invoice by patient ID
router.get("/:patientId", isreceiption, getInvoiceByPatientId);

module.exports = router;
