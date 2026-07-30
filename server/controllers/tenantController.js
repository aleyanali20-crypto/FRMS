import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Add Tenant
export const addTenant = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      cnic,
      unit,
      rent,
      agreementStart,
      agreementEnd,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create Tenant
    const tenant = await Tenant.create({
      name,
      phone,
      email,
      cnic,
      unit,
      rent,
      agreementStart,
      agreementEnd,
    });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Login Account
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "tenant",
    });

    res.status(201).json({
      success: true,
      message: "Tenant Added Successfully",
      data: tenant,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Tenants
export const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find();

    res.status(200).json({
      success: true,
      data: tenants,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};