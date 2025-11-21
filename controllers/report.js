// controllers/patientController.js
const Patient = require("../models/patientregistration");

/**
 * Get patients by single date
 * GET /api/patients?date=yyyy-mm-dd&page=1&limit=10
 */
const getPatientsByDate = async (req, res) => {
  try {
    const { date, page = 1, limit = 10 } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date query parameter is required" });
    }

    // Create start and end of day (UTC)
    const startDay = new Date(`${date}T00:00:00Z`);
    const endDay = new Date(`${date}T23:59:59Z`);

    // Build query
    const query = { date: { $gte: startDay, $lte: endDay } };

    let patients;
    let totalPatients = await Patient.countDocuments(query);

    if (limit === "all") {
      // Return all patients
      patients = await Patient.find(query).sort({ date: -1 });
    } else {
      // Return paginated patients
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
    console.error("Error fetching patients by date:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getPatientsByDate };
