const express = require("express");
const router = express.Router();
const {
  createHospitalUser,
  getHospitalUsers,
  deleteHospitalUser,
} = require("../controllers/hospitalUserController");

// Assign user to hospital
/**
 * @swagger
 * /api/hospital-users:
 *   post:
 *     summary: Assign user to hospital
 *     tags: [HospitalUsers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: User assigned to hospital
 */
router.post("/", createHospitalUser);

// Get all users of a specific hospital
/**
 * @swagger
 * /api/hospital-users/{hospitalId}:
 *   get:
 *     summary: Get all users of a specific hospital
 *     tags: [HospitalUsers]
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of users for hospital
 */
router.get("/:hospitalId", getHospitalUsers);

// Remove user from hospital (using composite key)
/**
 * @swagger
 * /api/hospital-users/{hospitalId}/{userId}:
 *   delete:
 *     summary: Remove user from hospital
 *     tags: [HospitalUsers]
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User removed from hospital
 */
router.delete("/:hospitalId/:userId", deleteHospitalUser);

module.exports = router;
