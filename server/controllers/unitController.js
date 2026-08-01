import Unit from "../models/Unit.js";

// ================= Add Unit =================
export const addUnit = async (req, res) => {
  try {
    const {
      unitNumber,
      floor,
      size,
      rent,
      status,
      description,
    } = req.body;

    // Check if unit already exists
    const existingUnit = await Unit.findOne({ unitNumber });

    if (existingUnit) {
      return res.status(400).json({
        success: false,
        message: "Unit already exists",
      });
    }

    // Create Unit
    const unit = await Unit.create({
      unitNumber,
      floor,
      size,
      rent,
      status,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Unit Added Successfully",
      data: unit,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get All Units =================
export const getUnits = async (req, res) => {
  try {
    const units = await Unit.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: units,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get Vacant Units =================
export const getVacantUnits = async (req, res) => {
  try {
    const units = await Unit.find({
      status: "Vacant",
    });

    res.status(200).json({
      success: true,
      data: units,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Update Unit =================
export const updateUnit = async (req, res) => {
  try {
    const unit = await Unit.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Unit Updated Successfully",
      data: unit,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Delete Unit =================
export const deleteUnit = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);

    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    if (unit.status === "Occupied") {
      return res.status(400).json({
        success: false,
        message: "Occupied unit cannot be deleted",
      });
    }

    await Unit.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Unit Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};