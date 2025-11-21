// controllers/patientController.js
const Patient = require("../models/patientregistration");

/**
 * Get patients by date range
 * GET /api/patients?startDate=yyyy-mm-dd&endDate=yyyy-mm-dd&page=1&limit=10
 */
const getPatientsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Both startDate and endDate are required" });
    }

    // Convert to Date objects
    const start = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T23:59:59Z`);

    // Build query
    const query = { date: { $gte: start, $lte: end } };

    const totalPatients = await Patient.countDocuments(query);

    let patients;
    if (limit === "all") {
      // Return all patients
      patients = await Patient.find(query).sort({ date: -1 });
    } else {
      const skip = (Number(page) - 1) * Number(limit);
      patients = await Patient.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(Number(limit));
    }

    return res.status(200).json({
      page: limit === "all" ? 1 : Number(page),
      limit: limit === "all" ? totalPatients : Number(limit),
      totalPatients,
      data: patients,
    });
  } catch (error) {
    console.error("Error fetching patients by date range:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getPatientsByDateRange };
