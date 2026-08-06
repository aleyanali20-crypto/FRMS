import Rent from "../models/Rent.js";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";

// ================= Upload Rent Slip =================
export const uploadRent = async (req, res) => {
  try {
    const { month, year, amount } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const tenant = await Tenant.findOne({
      email: user.email,
    });

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload rent slip",
      });
    }

    const alreadyPaid = await Rent.findOne({
      tenant: tenant._id,
      month,
      year,
    });

    if (alreadyPaid) {
      return res.status(400).json({
        success: false,
        message: "Rent already submitted for this month",
      });
    }

    const rent = await Rent.create({
      tenant: tenant._id,
      tenantName: tenant.name,
      tenantEmail: tenant.email,
      unit: tenant.unit,
      month,
      year,
      amount,
      slip: `rents/${req.file.filename}`,
      paymentMethod: "Online",
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Rent Submitted Successfully",
      data: rent,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get All Payments =================
export const getPayments = async (req, res) => {
  try {

    const rents = await Rent.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: rents,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Pending Payments =================
export const getPendingPayments = async (req, res) => {
  try {

    const rents = await Rent.find({
      status: "Pending",
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: rents,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Approve Payment =================
export const approvePayment = async (req, res) => {
  try {

    const rent = await Rent.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
        approvedBy: "Admin",
        approvedDate: new Date(),
      },
      {
        new: true,
      }
    );

    if (!rent) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment Approved Successfully",
      data: rent,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Delete Rent =================
export const deleteRent = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

if (  user.role !== "superadmin") {
  return res.status(403).json({
    success: false,
    message: "Only Admin or Super Admin can delete",
  });
}

    const rent = await Rent.findById(req.params.id);

    if (!rent) {
      return res.status(404).json({
        success: false,
        message: "Rent record not found.",
      });
    }

    await Rent.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Rent deleted successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Reject Payment =================
export const rejectPayment = async (req, res) => {
  try {

    const rent = await Rent.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
        remarks: req.body.remarks || "",
      },
      {
        new: true,
      }
    );

    if (!rent) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment Rejected",
      data: rent,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Cash Payment =================
export const addCashPayment = async (req, res) => {
  try {

    const {
      tenantId,
      month,
      year,
      amount,
      remarks,
    } = req.body;

    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    const alreadyPaid = await Rent.findOne({
      tenant: tenantId,
      month,
      year,
    });

    if (alreadyPaid) {
      return res.status(400).json({
        success: false,
        message: "Rent already collected for this month",
      });
    }

    const rent = await Rent.create({
      tenant: tenant._id,
      tenantName: tenant.name,
      tenantEmail: tenant.email,
      unit: tenant.unit,
      month,
      year,
      amount,
      paymentMethod: "Cash",
      remarks,
      status: "Approved",
      approvedBy: "Admin",
      approvedDate: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Cash Payment Added Successfully",
      data: rent,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};