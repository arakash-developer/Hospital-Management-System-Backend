const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Create a new hospital
exports.createHospital = async (req, res) => {
  try {
    const { name, address, hospitalNumber } = req.body

    const hospital = await prisma.hospital.create({
      data: {
        name,
        address,
        hospitalNumber
      }
    })

    res.status(201).json(hospital)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create hospital' })
  }
}

// Get all hospitals
exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany()
    res.json(hospitals)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch hospitals' })
  }
}

// Get hospital by ID
exports.getHospitalById = async (req, res) => {
  try {
    const { id } = req.params
    const hospital = await prisma.hospital.findUnique({
      where: { id }
    })

    if (!hospital) {
      return res.status(404).json({ error: 'Hospital not found' })
    }

    res.json(hospital)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch hospital' })
  }
}

// Update hospital
exports.updateHospital = async (req, res) => {
  try {
    const { id } = req.params
    const { name, address, hospitalNumber } = req.body

    const hospital = await prisma.hospital.update({
      where: { id },
      data: { name, address, hospitalNumber }
    })

    res.json(hospital)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update hospital' })
  }
}

// Delete hospital
exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.params
    await prisma.hospital.delete({
      where: { id }
    })

    res.json({ message: 'Hospital deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete hospital' })
  }
}
