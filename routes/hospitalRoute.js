const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

// Routes
/**
 * @swagger
 * /api/hospitals:
 *   post:
 *     summary: Create a new hospital
 *     tags: [Hospitals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Hospital created
 *   get:
 *     summary: Get all hospitals
 *     tags: [Hospitals]
 *     responses:
 *       200:
 *         description: List of hospitals
 */
router.post("/", hospitalController.createHospital);
router.get("/", hospitalController.getAllHospitals);
/**
 * @swagger
 * /api/hospitals/{id}:
 *   get:
 *     summary: Get hospital by ID
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hospital found
 *   put:
 *     summary: Update hospital by ID
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Hospital updated
 *   delete:
 *     summary: Delete hospital by ID
 *     tags: [Hospitals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hospital deleted
 */
router.get("/:id", hospitalController.getHospitalById);
router.put("/:id", hospitalController.updateHospital);
router.delete("/:id", hospitalController.deleteHospital);

module.exports = router;
