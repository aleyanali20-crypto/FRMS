import Rent from "../models/Rent.js";
import Expense from "../models/Expense.js";

export const getAccountantDashboard = async (req, res) => {
  try {
    const today = new Date();

    // Today's Start & End
    const startToday = new Date(today);
    startToday.setHours(0, 0, 0, 0);

    const endToday = new Date(today);
    endToday.setHours(23, 59, 59, 999);

    // Current Month
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // Today's Collection
    const todayCollection = await Rent.aggregate([
      {
        $match: {
          status: "Approved",
          paymentDate: {
            $gte: startToday,
            $lte: endToday,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Monthly Collection
    const monthlyCollection = await Rent.aggregate([
      {
        $match: {
          status: "Approved",
          paymentDate: {
            $gte: monthStart,
            $lt: monthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Pending Payments
    const pendingPayments = await Rent.countDocuments({
      status: "Pending",
    });

    // Monthly Expenses
    const expense = await Expense.aggregate([
      {
        $match: {
          date: {
            $gte: monthStart,
            $lt: monthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Recent Payments
    const recentPayments = await Rent.find()
      .sort({ paymentDate: -1 })
      .limit(5);

    // Recent Expenses
    const recentExpenses = await Expense.find()
      .sort({ date: -1 })
      .limit(5);

    res.json({
      success: true,

      todayCollection:
        todayCollection[0]?.total || 0,

      monthlyCollection:
        monthlyCollection[0]?.total || 0,

      pendingPayments,

      totalExpenses:
        expense[0]?.total || 0,

      recentPayments,

      recentExpenses,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};