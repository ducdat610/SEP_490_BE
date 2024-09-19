import mongoose, { Schema } from "mongoose";

const statusPotsSchema = new Schema(
    {
        spaceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "spaces",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        communityStandardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "communityStandards",
            required: true,
        },
        name: {
            type: String,
        },
        status: {
            type: String,
            enum: ['choDuyet', 'daDuyet', 'tuChoi', 'biAn'],
            default: 'choDuyet',
        },
        reason: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)
const statusPost = mongoose.model("statusPosts", statusPotsSchema);

export default statusPost;