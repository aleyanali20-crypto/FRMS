import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dns from "dns/promises";
dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config({ path: "./.env" });

console.log("PORT =", process.env.PORT);
console.log("MONGO_URI =", process.env.MONGO_URI);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FRMS API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});