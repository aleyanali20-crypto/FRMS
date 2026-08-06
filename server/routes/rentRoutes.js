import express from "express";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";

import {
  uploadRent,
  getPayments,
  getPendingPayments,
  approvePayment,
  rejectPayment,
  addCashPayment,
  deleteRent,
} from "../controllers/rentController.js";

const router = express.Router();

// Upload Rent Slip
router.post(
  "/upload",
  protect,
  upload.single("slip"),
  uploadRent
);

// Cash Payment
router.post(
  "/cash",
  protect,
  addCashPayment
);

// Get All Payments
router.get(
  "/",
  protect,
  getPayments
);

// Get Pending Payments
router.get(
  "/pending",
  protect,
  getPendingPayments
);

// Approve Payment
router.put(
  "/approve/:id",
  protect,
  approvePayment
);

// Reject Payment
router.put(
  "/reject/:id",
  protect,
  rejectPayment
);

// Delete Rent
router.delete(
  "/:id",
  protect,
  deleteRent
);

export default router;