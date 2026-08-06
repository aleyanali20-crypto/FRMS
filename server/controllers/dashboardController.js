import Rent from "../models/Rent.js";
import Expense from "../models/Expense.js";
import Tenant from "../models/Tenant.js";
import Unit from "../models/Unit.js";

// ===============================
// Dashboard Statistics
// ===============================

export const getDashboardStats = async (req, res) => {
  try {

    const today = new Date();

    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );

    // ===========================
    // Counts
    // ===========================

    const totalTenants = await Tenant.countDocuments();

    const totalUnits = await Unit.countDocuments();

    const pendingPayments = await Rent.countDocuments({
      status: "Pending",
    });

    // ===========================
    // Total Rent
    // ===========================

    const rent = await Rent.aggregate([
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

    const totalRent =
      rent.length > 0 ? rent[0].total : 0;

    // ===========================
    // Total Expense
    // ===========================

    const expense = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalExpense =
      expense.length > 0 ? expense[0].total : 0;

    // ===========================
    // Cash In Hand
    // ===========================

    const cashInHand =
      totalRent - totalExpense;

    // ===========================
    // Recent Payments
    // ===========================

    const recentPayments = await Rent.find({
      status: "Approved",
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // ===========================
    // Recent Expenses
    // ===========================

    const recentExpenses = await Expense.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // ===========================
    // Monthly Rent Chart
    // ===========================

    const monthlyRent = await Rent.aggregate([
  {
    $match: {
      status: "Approved",
    },
  },
  {
    $group: {
      _id: { $month: "$paymentDate" },
      total: { $sum: "$amount" },
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
]);

    // ===========================
    // Monthly Expense Chart
    // ===========================

    const monthlyExpense = await Expense.aggregate([
  {
    $group: {
      _id: { $month: "$date" },
      total: { $sum: "$amount" },
    },
  },
  {
    $sort: {
      _id: 1,
    },
  },
]);

    res.json({
      totalTenants,
      totalUnits,
      totalRent,
      totalExpense,
      cashInHand,
      pendingPayments,
      recentPayments,
      recentExpenses,
      monthlyRent,
      monthlyExpense,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }
};