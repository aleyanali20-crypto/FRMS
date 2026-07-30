import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    cnic: {
      type: String,
    },
    unit: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    agreementStart: {
      type: Date,
    },
    agreementEnd: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tenant", tenantSchema);