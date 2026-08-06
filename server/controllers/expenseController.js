import Expense from "../models/Expense.js";
import User from "../models/User.js";

// ================= Add Expense =================

export const addExpense = async (req, res) => {
  try {
    const {
      title,
      category,
      amount,
      date,
      description,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const expense = await Expense.create({
      title,
      category,
      amount,
      date,
      description,
      receipt: req.file ? req.file.filename : "",
      postedBy: user._id,
      postedByName: user.name,
    });

    res.status(201).json({
      success: true,
      message: "Expense Added Successfully",
      data: expense,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Get Expenses =================

export const getExpenses = async (req, res) => {
  try {

   const user = await User.findById(req.user.id);

let expenses;

if (
  user.role === "superadmin" ||
  user.role === "admin"
) {

  expenses = await Expense.find().sort({
    createdAt: -1,
  });

} else {

  expenses = await Expense.find({
    postedBy: req.user.id,
  }).sort({
    createdAt: -1,
  });

}
    res.status(200).json({
      success: true,
      data: expenses,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Update Expense =================

export const updateExpense = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Admin can edit all
    // Accountant only own expense

    if (user.role !== "superadmin") {
  return res.status(403).json({
    success: false,
    message: "Only Super Admin can edit expenses",
  });
}

    expense.title = req.body.title;
    expense.category = req.body.category;
    expense.amount = req.body.amount;
    expense.date = req.body.date;
    expense.description = req.body.description;

    if (req.file) {
      expense.receipt = req.file.filename;
    }

    await expense.save();

    res.status(200).json({
      success: true,
      message: "Expense Updated Successfully",
      data: expense,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Delete Expense =================

export const deleteExpense = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (user.role !== "superadmin") {

      return res.status(403).json({
        success: false,
        message: "Only Super Admin can delete expenses",
      });

    }

    const expense = await Expense.findById(req.params.id);

    if (!expense) {

      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });

    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Expense Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Total Expense =================

export const getTotalExpense = async (req, res) => {
  try {

    const total = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalExpense: {
            $sum: "$amount",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      totalExpense:
        total.length > 0 ? total[0].totalExpense : 0,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};