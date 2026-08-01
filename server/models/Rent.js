import mongoose from "mongoose";

const rentSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    tenantName: {
      type: String,
      required: true,
    },

    tenantEmail: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    // Online payment slip
    slip: {
      type: String,
      default: "",
    },

    // Payment Method
    paymentMethod: {
      type: String,
      enum: ["Online", "Cash"],
      default: "Online",
    },

    // Payment Status
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    remarks: {
      type: String,
      default: "",
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    approvedBy: {
      type: String,
      default: "",
    },

    approvedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Rent", rentSchema);