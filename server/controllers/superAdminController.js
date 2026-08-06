import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Rent from "../models/Rent.js";
import Expense from "../models/Expense.js";
import Tenant from "../models/Tenant.js";
import Unit from "../models/Unit.js";

// =============================
// Create Admin / Accountant
// =============================
export const createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["admin", "accountant"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Role",
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role,
    });

    res.status(201).json({
      success: true,
      message: `${role} created successfully`,
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// =============================
// Get All Staff
// =============================
export const getStaff = async (req, res) => {
  try {

    const staff = await User.find({
      role: { $in: ["admin", "accountant"] },
    }).select("-password");

    res.status(200).json({
      success: true,
      count: staff.length,
      staff,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// ================= Update Staff =================
export const updateStaff = async (req, res) => {
  try {

    const { name, email, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (user.role === "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Super Admin cannot be updated",
      });
    }

    user.name = name;
    user.email = email;
    user.role = role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Staff Updated Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// =============================
// Delete Staff
// =============================
export const deleteStaff = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // Super Admin cannot be deleted
    if (user.role === "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Super Admin cannot be deleted",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Staff Deleted Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// =============================
// Super Admin Dashboard
// =============================
export const getDashboard = async (req, res) => {
  try {

    const totalStaff = await User.countDocuments({
      role: { $in: ["admin", "accountant"] },
    });

    const totalTenants = await Tenant.countDocuments();

    const totalUnits = await Unit.countDocuments();

    const occupiedUnits = await Unit.countDocuments({
      status: "Occupied",
    });

    const vacantUnits = await Unit.countDocuments({
      status: "Vacant",
    });

    // Total Collection
    const collection = await Rent.aggregate([
      {
        $match: {
          status: "Approved",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    // Total Expenses
    const expenses = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalCollection =
      collection[0]?.total || 0;

    const totalExpenses =
      expenses[0]?.total || 0;

    const cashInHand =
      totalCollection - totalExpenses;

    res.json({
      success: true,

      totalStaff,
      totalTenants,
      totalUnits,
      occupiedUnits,
      vacantUnits,

      totalCollection,
      totalExpenses,
      cashInHand,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};