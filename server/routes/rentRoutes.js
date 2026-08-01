import express from "express";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  uploadRent,
  getPayments,
  getPendingPayments,
  approvePayment,
  rejectPayment,
  addCashPayment,
} from "../controllers/rentController.js";

const router = express.Router();

// Upload Rent Slip
router.post(
  "/upload",
  authMiddleware,
  upload.single("slip"),
  uploadRent
);

// Cash Payment
router.post(
  "/cash",
  authMiddleware,
  addCashPayment
);

// Get All Payments
router.get("/", authMiddleware, getPayments);

// Get Pending Payments
router.get("/pending", authMiddleware, getPendingPayments);

// Approve Payment
router.put("/approve/:id", authMiddleware, approvePayment);

// Reject Payment
router.put("/reject/:id", authMiddleware, rejectPayment);

export default router;