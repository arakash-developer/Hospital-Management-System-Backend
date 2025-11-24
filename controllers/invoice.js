const Invoice = require("../models/invoice");

// GET all invoices without pagination
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate("PatientRegistration") // include patient info
      .populate("updatedBy") // include user who updated invoice
      .sort({ date: -1 }); // latest first

    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching invoices", error });
  }
};

// GET single invoice by invoice ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("patient")
      .populate("updatedBy");

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching invoice", error });
  }
};

// GET invoice by patient ID
const getInvoiceByPatientId = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ patient: req.params.patientId })
      .populate("patient")
      .populate("updatedBy");

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching invoice", error });
  }
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  getInvoiceByPatientId,
};
