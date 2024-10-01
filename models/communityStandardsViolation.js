import mongoose, { Schema } from "mongoose";

const communityStandardsSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Reasons = mongoose.model("communitystandards", communityStandardsSchema);
export default Reasons;
