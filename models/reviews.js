import mongoose, { Schema } from "mongoose";
//
const reviewsSchema = new Schema(
  {
    text: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "spaces",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    replies: [
      {
        text: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Reviews = mongoose.model("reviews", reviewsSchema);

export default Reviews;
export { reviewsSchema };
