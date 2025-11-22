const express = require("express");
const isReceiptionist = require("../middlewares/isreceiption");
const router = express.Router();
const {
  createOrUpdateDue,
  getDueByPatient
} = require("../controllers/duecollection");
router.put("/patientid/:patientid", isReceiptionist, createOrUpdateDue);
router.get(
  "/patientid/:patientid",
  isReceiptionist,
  getDueByPatient
);

module.exports = router;
