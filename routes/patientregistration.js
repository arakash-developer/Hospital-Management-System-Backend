const express = require("express");
const router = express.Router();
const {createPatient,getAllPatients,getPatientById,deletePatient,getPatientByPatientId} = require("../controllers/patientregistration");

// Routes
router.post("/", createPatient);
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.get("/patientid/:id", getPatientByPatientId); // search by patientid
router.delete("/:id", deletePatient);

module.exports = router;
