const Doctor = require("../models/doctor");
const Country = require("../models/country");

// CREATE DOCTOR
const createDoctor = async (req, res) => {
  try {
    const { doctorname,doctortitle,  qualification ,speciality,country , phone,mobile,email } = req.body;
    const doctor = new Doctor({ doctorname,doctortitle,  qualification ,speciality,country , phone,mobile,email });
    const saved = await doctor.save();
    res.status(201).json({
      message: "Doctor created successfully",
      doctorId: saved._id,
    });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ message: "Failed to create doctor" });
  }
};

// GET ALL DOCTORS
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("country")
      .sort({ _id: -1 });
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

// UPDATE DOCTOR 
const updateDoctor = async (req, res) => {
  try {
    const id = req.params.id;
    const { doctorname,doctortitle,  qualification ,speciality,country , phone,mobile,email } = req.body;
    
    const updated = await Doctor.findByIdAndUpdate(
      id,
      { doctorname,doctortitle,  qualification ,speciality,country , phone,mobile,email },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: "Doctor updated successfully",
      doctor: updated,
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Failed to update doctor" });
  }
};

// DELETE DOCTOR
const deleteDoctor = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Doctor.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Failed to delete doctor" });
  }
};

module.exports = {
    createDoctor,
    getDoctors,
    updateDoctor,
    deleteDoctor,
};
