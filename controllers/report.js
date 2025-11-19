// controllers/patientController.js
const Patient = require("../models/patientregistration"); 

/**
 * Get patients by single date
 * GET /api/patients?date=yyyy-mm-dd
 */
const getPatientsByDate = async (req, res) => {
  try {
    const { date } = req.query; // "yyyy-mm-dd"
    if (!date) {
      return res.status(400).json({ message: "Date query parameter is required" });
    }

    // Create start and end of day (UTC)
    const startDay = new Date(`${date}T00:00:00Z`);
    const endDay = new Date(`${date}T23:59:59Z`);

    // Fetch patients in this date
    const patients = await Patient.find({
      date: { $gte: startDay, $lte: endDay },
    }).sort({ date: -1 });

    return res.status(200).json({
      page: 1,
      limit: patients.length,
      totalPatients: patients.length,
      data: patients,
    });
  } catch (error) {
    console.error("Error fetching patients by date:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getPatientsByDate };
