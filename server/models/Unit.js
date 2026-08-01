import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    unitNumber: {
      type: String,
      required: true,
      unique: true,
    },

    floor: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    rent: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Vacant", "Occupied"],
      default: "Vacant",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Unit", unitSchema);