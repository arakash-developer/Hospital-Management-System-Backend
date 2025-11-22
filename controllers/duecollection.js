const Due = require("../models/duecollection");
const PatientRegistration = require("../models/patientregistration");

// Create or Update Due
const createOrUpdateDue = async (req, res) => {
  try {
    const { patientid } = req.params;
    const { procedurecalculation = [], userId } = req.body;

    if (!procedurecalculation.length) {
      return res.status(400).json({ message: "procedurecalculation required" });
    }

    const patient = await PatientRegistration.findOne({ patientid });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // --------------------------
    // 1️⃣ SAVE RAW USER DATA → Due Collection
    // --------------------------
    const rawTotals = {
      paid: 0,
      discount: 0,
    };

    procedurecalculation.forEach((item) => {
      rawTotals.paid += Number(item.paid || 0);
      rawTotals.discount += Number(item.discount || 0);
    });

    const dueSnapshot = await Due.create({
      patient: patient._id,
      paid: rawTotals.paid, // RAW USER INPUT
      due: 0, // Will be calculated
      discount: rawTotals.discount, // RAW USER INPUT
      updatedBy: userId,
    });

    // --------------------------
    // 2️⃣ MERGE & CALCULATE → PatientRegistration
    // --------------------------
    const existingProcedures = patient.procedurecalculation || [];

    // Create a map for easy lookup and merging
    const procedureMap = new Map();

    // Add existing procedures to map
    existingProcedures.forEach((proc) => {
      procedureMap.set(proc.depname, {
        depname: proc.depname,
        totalPrice: Number(proc.totalPrice || 0),
        discount: Number(proc.discount || 0),
        discounted: Number(proc.discounted || 0),
        paid: Number(proc.paid || 0),
        due: Number(proc.due || 0),
      });
    });

    // Merge with new raw data from frontend
    procedurecalculation.forEach((newData) => {
      const existing = procedureMap.get(newData.depname) || {
        depname: newData.depname,
        totalPrice: Number(newData.totalPrice || 0),
        discount: 0,
        discounted: 0,
        paid: 0,
        due: 0,
      };

      // Add new payments and discounts to existing values
      const updatedDiscount = existing.discount + Number(newData.discount || 0);
      const updatedPaid = existing.paid + Number(newData.paid || 0);
      const updatedDiscounted = existing.totalPrice - updatedDiscount;
      const updatedDue = updatedDiscounted - updatedPaid;

      procedureMap.set(newData.depname, {
        depname: newData.depname,
        totalPrice: existing.totalPrice,
        discount: updatedDiscount,
        discounted: updatedDiscounted,
        paid: updatedPaid,
        due: updatedDue > 0 ? updatedDue : 0,
      });
    });

    // Convert map back to array
    const updatedProcedures = Array.from(procedureMap.values());

    // Calculate totals
    const totals = {
      totalCharge: 0,
      totalDiscount: 0,
      totalDiscounted: 0,
      totalPaid: 0,
      totalDue: 0,
    };

    updatedProcedures.forEach((proc) => {
      totals.totalCharge += proc.totalPrice;
      totals.totalDiscount += proc.discount;
      totals.totalDiscounted += proc.discounted;
      totals.totalPaid += proc.paid;
      totals.totalDue += proc.due;
    });

    // Update patient record
    patient.procedurecalculation = updatedProcedures;
    patient.totalCharge = totals.totalCharge;
    patient.totalDiscount = totals.totalDiscount;
    patient.totalDiscounted = totals.totalDiscounted;
    patient.totalPaid = totals.totalPaid;
    patient.totalDue = totals.totalDue;

    await patient.save();

    // Update due snapshot with calculated due
    dueSnapshot.due = totals.totalDue;
    await dueSnapshot.save();

    // Populate patient and updatedBy
    const populatedSnapshot = await Due.findById(dueSnapshot._id)
      .populate("patient")
      .populate("updatedBy", "name");

    // --------------------------
    // 3️⃣ SEND CLEAN RESPONSE
    // --------------------------
    return res.status(200).json({
      success: true,
      patient: populatedSnapshot.patient,
      paid: populatedSnapshot.paid,
      discount: populatedSnapshot.discount,
      due: populatedSnapshot.due,
      updatedBy: populatedSnapshot.updatedBy?.name || "Unknown",
      date: populatedSnapshot.date,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating billing",
      error: error.message,
    });
  }
};

// Get latest Due snapshot for a patient
const getDueByPatient = async (req, res) => {
  try {
    const { patientid } = req.params;

    const patient = await PatientRegistration.findOne({ patientid });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const latestDue = await Due.findOne({ patient: patient._id })
      .populate("patient")
      .populate("updatedBy", "name")
      .sort({ date: -1 });

    if (!latestDue) {
      return res.status(404).json({ message: "No due snapshot found" });
    }

    return res.status(200).json({
      success: true,
      patient: latestDue.patient,
      paid: latestDue.paid,
      discount: latestDue.discount,
      due: latestDue.due,
      updatedBy: latestDue.updatedBy?.name || "Unknown",
      date: latestDue.date,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching latest due snapshot",
      error: error.message,
    });
  }
};

module.exports = {
  createOrUpdateDue,
  getDueByPatient,
};
