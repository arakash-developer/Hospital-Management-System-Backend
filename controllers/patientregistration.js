const PatientRegistration = require("../models/patientregistration");

// CREATE a new patient registration
const createPatient = async (req, res) => {
  try {
    const patient = new PatientRegistration(req.body);
    console.log(req.body);
    
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
// GET all patients with pagination
const getAllPatients = async (req, res) => {
  try {
    // Get page and limit from query params, default: page=1, limit=20
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skip = (page - 1) * limit;

    // Fetch patients with pagination
    const patients = await PatientRegistration.find()
      .populate("refDoctor") // optional: populate doctor details
      .populate("procedures.test") // test details
      .populate("receptionist") // receptionist details
      .sort({ _id: -1 }) // latest first
      .skip(skip)
      .limit(limit)
      .exec();

    // Get total count for frontend pagination
    const totalPatients = await PatientRegistration.countDocuments();

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(totalPatients / limit),
      totalPatients,
      data: patients,
    });
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

// GET single patient by patientid
const getPatientByPatientId = async (req, res) => {
  try {
    const patient = await PatientRegistration.findOne({
      patientid: req.params.id,
    })
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




const updatePatientRegistration = async (req, res) => {
  try {
    const { patientid } = req.params;

    let patient = await PatientRegistration.findOne({ patientid });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    /** ------------------------------
     * UPDATE ONLY procedurecalculation
     * ------------------------------*/
    if (req.body.procedurecalculation) {
      patient.procedurecalculation = req.body.procedurecalculation;
    } else {
      return res.status(400).json({
        message: "procedurecalculation is required for this update"
      });
    }

    /** ------------------------------
     * RECALCULATE TOTALS ONLY
     * ------------------------------*/
    const calc = patient.procedurecalculation;

    patient.totalCharge = calc.reduce((sum, item) => sum + item.totalPrice, 0);
    patient.totalDiscount = calc.reduce((sum, item) => sum + item.discount, 0);
    patient.totalDiscounted = calc.reduce((sum, item) => sum + item.discounted, 0);
    patient.totalPaid = calc.reduce((sum, item) => sum + (item.paid || 0), 0);
    patient.totalDue = patient.totalDiscounted - patient.totalPaid;

    await patient.save();

    res.status(200).json({
      success: true,
      message: "Billing updated successfully",
      patient,
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      message: "Error updating billing",
      error: error.message,
    });
  }
};




module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  deletePatient,
  getPatientByPatientId,
  updatePatientRegistration,
};
