import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorize.js";
import { getAccountantDashboard } from "../controllers/accountantController.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorize("accountant"),
  getAccountantDashboard
);

export default router;