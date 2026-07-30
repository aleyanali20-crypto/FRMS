import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const existingUser = await User.findOne({
  email: "admin@gmail.com",
});

if (existingUser) {
  console.log("Admin already exists");
  process.exit();
}

const hashedPassword = await bcrypt.hash("123456", 10);

await User.create({
  name: "Admin",
  email: "admin@gmail.com",
  password: hashedPassword,
  role: "admin",
});

console.log("✅ Admin Created Successfully");

process.exit();