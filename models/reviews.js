import mongoose, { Schema } from "mongoose";

const reviewsSchema = new Schema(
  {
    text: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
const Reviews = mongoose.model("reviews", reviewsSchema);

export default Reviews;
export { reviewsSchema };
