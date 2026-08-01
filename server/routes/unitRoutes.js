import express from "express";

import {
  addUnit,
  getUnits,
  getVacantUnits,
  updateUnit,
  deleteUnit,
} from "../controllers/unitController.js";

const router = express.Router();

// Add Unit
router.post("/", addUnit);

// Get All Units
router.get("/", getUnits);

// Get Vacant Units
router.get("/vacant", getVacantUnits);

// Update Unit
router.put("/:id", updateUnit);

// Delete Unit
router.delete("/:id", deleteUnit);

export default router;