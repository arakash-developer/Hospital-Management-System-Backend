const PatientRegistration = require("../models/patientregistration");

// CREATE a new patient registration
const createPatient = async (req, res) => {
  try {
    const patient = new PatientRegistration(req.body);
    await patient.save();
    res
      .status(201)
      .json({ message: "Patient registered successfully", patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating patient", error });
  }
};

// GET all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await PatientRegistration.find()
      .populate("refDoctor") // optional: populate doctor details
      .sort({ _id: -1 }) // sort by _id descending (latest first)

      .exec();
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

// GET single patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await PatientRegistration.findById(req.params.id)
      .populate("refDoctor")
      .exec();
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

// DELETE patient by ID
const deletePatient = async (req, res) => {
  try {
    const deleted = await PatientRegistration.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient deleted successfully", deleted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting patient", error });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  deletePatient,
};
