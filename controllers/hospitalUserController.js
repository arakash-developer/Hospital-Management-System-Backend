const { PrismaClient } = require('../prisma/generated/clientPg');
const prisma = new PrismaClient();

// Create a new hospital-user assignment
const createHospitalUser = async (req, res) => {
  try {
    const { userId, hospitalId, role, status } = req.body;

    if (!userId || !hospitalId || !role) {
      return res.status(400).json({ error: "userId, hospitalId, and role are required." });
    }

    const existing = await prisma.hospitalUser.findUnique({
      where: {
        userId_hospitalId: {
          userId,
          hospitalId
        }
      }
    });

    if (existing) {
      return res.status(409).json({ error: "This user is already assigned to the hospital." });
    }

    const hospitalUser = await prisma.hospitalUser.create({
      data: {
        userId,
        hospitalId,
        role,
        status
      }
    });

    res.status(201).json(hospitalUser);
  } catch (error) {
    console.error("Create hospital-user error:", error);
    res.status(500).json({ error: "Failed to assign user to hospital" });
  }
};

// Get all users assigned to a hospital
const getHospitalUsers = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const hospitalUsers = await prisma.hospitalUser.findMany({
      where: { hospitalId },
      include: {
        user: true
      }
    });

    res.json(hospitalUsers);
  } catch (error) {
    console.error("Get hospital users error:", error);
    res.status(500).json({ error: "Failed to fetch hospital users" });
  }
};

// Delete a hospital-user assignment
const deleteHospitalUser = async (req, res) => {
  try {
    const { hospitalId, userId } = req.params;

    await prisma.hospitalUser.delete({
      where: {
        userId_hospitalId: {
          userId,
          hospitalId
        }
      }
    });

    res.json({ message: "Hospital user removed successfully" });
  } catch (error) {
    console.error("Delete hospital user error:", error);
    res.status(500).json({ error: "Failed to remove hospital user" });
  }
};

module.exports = {
  createHospitalUser,
  getHospitalUsers,
  deleteHospitalUser
};
