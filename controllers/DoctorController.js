const { PrismaClient } = require("../prisma/generated/clientPg");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const createDoctor = async (req, res) => {
  try {
    const { name, specialization, appointments } = req.body;

    // Validate required fields
    if (!name || !specialization || !appointments) {
      return res
        .status(400)
        .json({ error: "Name, specialization and appointments are required" });
    }

    const doctor = await prisma.doctor.create({
      data: {
        name,
        specialization,
        appointments,
      },
    });

    res.status(201).json(doctor);
  } catch (error) {
    console.error("Create doctor error:", error);
    res.status(500).json({ error: "Failed to create doctor" });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.json(doctors);
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
};
