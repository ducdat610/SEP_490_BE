import mongoose, { Schema } from "mongoose";

const bookingsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    spaceId: {
      type: Schema.Types.ObjectId,
      ref: "spaces",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    items: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "bookingDetails",
        },
      ],
    checkOut: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["awaiting payment","completed","canceled"],
      default: "awaiting payment",
    },
    notes: {
      type: String,
      required: false,
    },
    cancelReason: {
      type: String,
      required: false,
    },
    timeSlot: {
      startTime: { type: String, required: true }, 
      endTime: { type: String, required: true },   
    },

  },
  { timeseries: true }
);
const Bookings = mongoose.model("bookings", bookingsSchema);

export default Bookings;
