import mongoose, { Schema } from "mongoose";

const bookingDetailSchema = new Schema(
  {
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "spaces",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const bookingDetail = mongoose.model("bookingDetails", bookingDetailSchema);
export default bookingDetail;
