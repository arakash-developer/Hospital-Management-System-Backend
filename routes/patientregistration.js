const express = require("express");
const router = express.Router();
const isReceiptionist = require("../middlewares/isreceiption");

const {
  createPatient,
  getAllPatients,
  getPatientById,
  deletePatient,
  getPatientByPatientId,
} = require("../controllers/patientregistration");

// Routes
router.post("/", isReceiptionist, createPatient);
router.get("/", isReceiptionist, getAllPatients);
router.get("/:id", isReceiptionist, getPatientById);
router.get("/patientid/:id", isReceiptionist, getPatientByPatientId); // search by patientid
router.delete("/:id", isReceiptionist, deletePatient);
module.exports = router;
