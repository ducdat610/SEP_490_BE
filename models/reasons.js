import mongoose, { Schema } from "mongoose";

const reasonSchema = new Schema(
  {
    text: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);
const Reasons = mongoose.model("reasons", reasonSchema);
export default Reasons;
