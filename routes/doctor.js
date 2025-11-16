const express = require("express");
const { createDoctor, getDoctors,updateDoctor,deleteDoctor } = require("../controllers/doctor");
const isReceiption = require("../middlewares/isreceiption");
const router = express.Router();

router.post("/", isReceiption, createDoctor);
router.get("/", isReceiption, getDoctors);
router.put("/:id", isReceiption, updateDoctor);
router.delete("/:id", isReceiption, deleteDoctor);

module.exports = router;
