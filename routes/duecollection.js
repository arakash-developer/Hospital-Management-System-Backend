const express = require("express");
const isReceiptionist = require("../middlewares/isreceiption");
const router = express.Router();
const {
  updateBillingWithSnapshotHistory,
  getDueCollectionHistoryByDate,
} = require("../controllers/duecollection");
router.put(
  "/patientid/:patientid",
  isReceiptionist,
  updateBillingWithSnapshotHistory
);
router.get(
  "/patientid/:patientid",
  isReceiptionist,
  getDueCollectionHistoryByDate
);

module.exports = router;
