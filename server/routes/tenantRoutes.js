import express from "express";

import {
  addTenant,
  getTenants,
  updateTenant,
  deleteTenant,
} from "../controllers/tenantController.js";

const router = express.Router();

router.post("/", addTenant);

router.get("/", getTenants);

router.put("/:id", updateTenant);

router.delete("/:id", deleteTenant);

export default router;