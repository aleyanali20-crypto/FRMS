import express from "express";
import upload from "../middleware/expenseUpload.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

// Add Expense
router.post(
  "/",
  protect,
  upload.single("receipt"),
  addExpense
);

// Get All Expenses
router.get(
  "/",
  protect,
  getExpenses
);

// Update Expense
router.put(
  "/:id",
  protect,
  authorize("superadmin"),
  upload.single("receipt"),
  updateExpense
);

// Delete Expense
router.delete(
  "/:id",
  protect,
  authorize("superadmin"),
  deleteExpense
);

export default router;