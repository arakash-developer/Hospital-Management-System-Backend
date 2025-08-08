const express = require("express");
const router = express.Router();
const { createUser, getUsers } = require("../controllers/userController");
const { getDoctors, createDoctor } = require("../controllers/DoctorController");

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Doctor created
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of doctors
 */
router.post("/", createDoctor);
router.get("/", getDoctors);

module.exports = router;
