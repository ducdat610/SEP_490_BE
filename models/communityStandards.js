import mongoose, { Schema } from "mongoose";

const communityStandardsSchema = new Schema(
  {
    reasons: {
      type: [String],
      required: true,
    },
    customReason: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const CommunityStandards = mongoose.model("communityStandards", communityStandardsSchema);

export default CommunityStandards;