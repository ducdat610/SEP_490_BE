import mongoose, { Schema } from "mongoose";

const communityStandardsSchema = new Schema(
  {
    reason: {
      type: String,
    },
    customeCommunityStandards: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
const CommunityStandards = mongoose.model("communityStandards", communityStandardsSchema);

export default CommunityStandards;