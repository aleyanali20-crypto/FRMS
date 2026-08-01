import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import Unit from "../models/Unit.js";
import bcrypt from "bcryptjs";

// ================= Add Tenant =================
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

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const selectedUnit = await Unit.findOne({
      unitNumber: unit,
    });

    if (!selectedUnit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    if (selectedUnit.status === "Occupied") {
      return res.status(400).json({
        success: false,
        message: "This unit is already occupied",
      });
    }

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

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "tenant",
    });

    await Unit.findOneAndUpdate(
      { unitNumber: unit },
      { status: "Occupied" }
    );

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

// ================= Get All Tenants =================
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

// ================= Update Tenant =================
export const updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tenant Updated Successfully",
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

// ================= Delete Tenant =================
export const deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    await Unit.findOneAndUpdate(
      { unitNumber: tenant.unit },
      { status: "Vacant" }
    );

    await User.findOneAndDelete({
      email: tenant.email,
    });

    await Tenant.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Tenant Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};