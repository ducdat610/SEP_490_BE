import mongoose, { Schema } from "mongoose";

const communityStandardsSchema = new Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)
const CommunityStandards = mongoose.model("communityStandards", communityStandardsSchema);

export default CommunityStandards;