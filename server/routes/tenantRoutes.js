import express from "express";
import { addTenant, getTenants } from "../controllers/tenantController.js";

const router = express.Router();

router.post("/", addTenant);
router.get("/", getTenants);

export default router;