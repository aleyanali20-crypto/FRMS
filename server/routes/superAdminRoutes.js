import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";

import {
  createStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  getDashboard,
} from "../controllers/superAdminController.js";

const router = express.Router();

// All routes only for Super Admin
router.use(protect);
router.use(authorize("superadmin"));

// Create Admin / Accountant
router.post("/staff", createStaff);

// Get All Staff
router.get("/staff", getStaff);

// Delete Staff
router.delete("/staff/:id", deleteStaff);
//update staff
router.put("/staff/:id", updateStaff);
router.get(
  "/dashboard",
  protect,
  authorize("superadmin"),
  getDashboard
);

export default router;