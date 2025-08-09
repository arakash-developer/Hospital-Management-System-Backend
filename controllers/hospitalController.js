const { PrismaClient } = require("../prisma/generated/clientPg");
const prisma = new PrismaClient();

// Create a new hospital
exports.createHospital = async (req, res) => {
  try {
    const { name, address, hospitalNumber,hospitalImg } = req.body;

    // Check for required fields
    if (!name || !hospitalNumber) {
      return res
        .status(400)
        .json({ error: "Name and hospitalNumber are required fields" });
    }

    // Check if hospital with the same hospitalNumber already exists
    const existingHospital = await prisma.hospital.findUnique({
      where: { hospitalNumber },
    });

    if (existingHospital) {
      return res
        .status(409)
        .json({ error: "Hospital with this hospital number already exists!" });
    }

    const hospital = await prisma.hospital.create({
      data: {
        name,
        address,
        hospitalNumber,
        hospitalImg,
      },
    });

    res.status(201).json(hospital);
  } catch (error) {
    console.error(error);
    if (
      error.code === "P2002" &&
      error.meta?.target?.includes("hospitalNumber")
    ) {
      return res
        .status(409)
        .json({ error: "Hospital with this hospital number already exists" });
    }
    res
      .status(500)
      .json({ error: "Failed to create hospital", details: error.message });
  }
};

// Get all hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany();

    if (!hospitals || hospitals.length === 0) {
      return res.status(200).json({ message: "No hospitals found", data: [] });
    }

    res
      .status(200)
      .json({ message: "Hospitals retrieved successfully", data: hospitals });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch hospitals", details: error.message });
  }
};

// Get hospital by ID
exports.getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Hospital ID is required" });
    }

    const hospital = await prisma.hospital.findUnique({
      where: { id },
    });

    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res
      .status(200)
      .json({ message: "Hospital retrieved successfully", data: hospital });
  } catch (error) {
    console.error("Error fetching hospital:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch hospital", details: error.message });
  }
};

// Update hospital
exports.updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, hospitalNumber } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Hospital ID is required" });
    }

    // Check if hospital exists
    const existingHospital = await prisma.hospital.findUnique({
      where: { id },
    });

    if (!existingHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    // Check if new hospitalNumber already exists for a different hospital
    if (hospitalNumber && hospitalNumber !== existingHospital.hospitalNumber) {
      const duplicateHospital = await prisma.hospital.findUnique({
        where: { hospitalNumber },
      });

      if (duplicateHospital && duplicateHospital.id !== id) {
        return res
          .status(409)
          .json({ error: "Hospital with this hospital number already exists" });
      }
    }

    const hospital = await prisma.hospital.update({
      where: { id },
      data: {
        name: name || undefined,
        address: address || undefined,
        hospitalNumber: hospitalNumber || undefined,
      },
    });

    res
      .status(200)
      .json({ message: "Hospital updated successfully", data: hospital });
  } catch (error) {
    console.error("Error updating hospital:", error);
    if (
      error.code === "P2002" &&
      error.meta?.target?.includes("hospitalNumber")
    ) {
      return res
        .status(409)
        .json({ error: "Hospital with this hospital number already exists" });
    }
    res
      .status(500)
      .json({ error: "Failed to update hospital", details: error.message });
  }
};

// Delete hospital
exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Hospital ID is required" });
    }

    // Check if hospital exists
    const existingHospital = await prisma.hospital.findUnique({
      where: { id },
    });

    if (!existingHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    // Check if hospital has associated users
    const hospitalUsers = await prisma.hospitalUser.findMany({
      where: { hospitalId: id },
    });

    if (hospitalUsers.length > 0) {
      return res.status(409).json({
        error: "Cannot delete hospital with associated users",
        message: "Please remove all users from this hospital before deleting",
      });
    }

    await prisma.hospital.delete({
      where: { id },
    });

    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    console.error("Error deleting hospital:", error);
    if (error.code === "P2003") {
      return res.status(409).json({
        error: "Cannot delete hospital with associated records",
        details:
          "Please remove all associated records before deleting this hospital",
      });
    }
    res
      .status(500)
      .json({ error: "Failed to delete hospital", details: error.message });
  }
};
