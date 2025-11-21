const PatientRegistration = require("../models/patientregistration");
const DueCollectionHistory = require("../models/duecollection");

const updateBillingWithSnapshotHistory = async (req, res) => {
  try {
    const { patientid } = req.params;
    const { procedurecalculation, userId } = req.body;

    const patient = await PatientRegistration.findOne({ patientid });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Update procedurecalculation if provided
    if (procedurecalculation) {
      patient.procedurecalculation = procedurecalculation;

      // Recalculate totals
      patient.totalCharge = procedurecalculation.reduce(
        (sum, i) => sum + i.totalPrice,
        0
      );
      patient.totalDiscount = procedurecalculation.reduce(
        (sum, i) => sum + i.discount,
        0
      );
      patient.totalDiscounted = procedurecalculation.reduce(
        (sum, i) => sum + i.discounted,
        0
      );
      patient.totalPaid = procedurecalculation.reduce(
        (sum, i) => sum + (i.paid || 0),
        0
      );
      patient.totalDue = patient.totalDiscounted - patient.totalPaid;
    }

    await patient.save();

    // Save snapshot in DueCollectionHistory
    await DueCollectionHistory.create({
      patient: patient._id,
      updatedBy: userId,
      procedurecalculation: patient.procedurecalculation.map((p) => ({
        depname: p.depname,
        totalPrice: p.totalPrice,
        discount: p.discount,
        discounted: p.discounted,
        paid: p.paid,
        due: p.discounted - p.paid,
      })),
      totals: {
        totalCharge: patient.totalCharge,
        totalDiscount: patient.totalDiscount,
        totalDiscounted: patient.totalDiscounted,
        totalPaid: patient.totalPaid,
        totalDue: patient.totalDue,
      },
    });

    res.status(200).json({
      success: true,
      message: "Billing updated and snapshot saved",
      patient,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating billing", error: error.message });
  }
};



const getDueCollectionHistoryByDate = async (req, res) => {
  try {
    const { patientid } = req.params;

    // Find patient
    const patient = await PatientRegistration.findOne({ patientid });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Fetch all history
    const history = await DueCollectionHistory.find({ patient: patient._id })
      .populate("updatedBy", "name")
      .sort({ date: 1 }); // earliest first

    // Group by date (YYYY-MM-DD)
    const grouped = {};
    history.forEach((h) => {
      const dateKey = h.date.toISOString().split("T")[0]; // format: YYYY-MM-DD
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push({
        procedurecalculation: h.procedurecalculation,
        totals: h.totals,
        updatedBy: h.updatedBy.name,
      });
    });

    res.status(200).json({
      success: true,
      patient: {
        patientid: patient.patientid,
        name: patient.patientname,
      },
      historyByDate: grouped,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error fetching due collection history",
        error: error.message,
      });
  }
};

module.exports = {
  getDueCollectionHistoryByDate,
  updateBillingWithSnapshotHistory,
};
