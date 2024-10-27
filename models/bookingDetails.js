import mongoose, { Schema } from "mongoose";

const bookingDetailSchema = new Schema(
  {
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "spaces",
      required: true,
    },
    quantity: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const bookingDetail = mongoose.model("bookingDetails", bookingDetailSchema);
export default bookingDetail;
