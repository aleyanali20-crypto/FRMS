import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns/promises";
import tenantRoutes from "./routes/tenantRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";
import rentRoutes from "./routes/rentRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import superAdminRoutes from "./routes/superAdminRoutes.js";
import accountantRoutes from "./routes/accountantRoutes.js";


dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config({ path: "./.env" });

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/rents", rentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/accountant", accountantRoutes);

app.get("/", (req, res) => {
  res.send("FRMS API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});