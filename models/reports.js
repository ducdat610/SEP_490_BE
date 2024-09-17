import mongoose, { Schema } from "mongoose";

const reportsSchema = new Schema({
  reason: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "spaces",
  },
});

const Reports = mongoose.model("reports", reportsSchema);
export default Reports;
