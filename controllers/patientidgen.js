const Counter = require("../models/patientidgen");

const getNextPatientId = async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { id: "patientid" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const nextId = counter.seq.toString().padStart(5, "0");

    res.status(200).json({ patientid: nextId });
  } catch (error) {
    console.error("ID Generation Error:", error);
    res.status(500).json({ message: "Error generating patient ID", error });
  }
};

module.exports = { getNextPatientId };