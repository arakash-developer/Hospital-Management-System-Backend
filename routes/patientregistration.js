const express = require("express");
const router = express.Router();
const {createPatient,getAllPatients,getPatientById,deletePatient} = require("../controllers/patientregistration");

// Routes
router.post("/", createPatient);
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.delete("/:id", deletePatient);

module.exports = router;
