import mongoose from "mongoose";

const userNeedsSchema = new mongoose.Schema({
  productPreferences: [
    {
      type: String,
      required: true,
    },
  ],
  goals: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const UserNeeds = mongoose.model("UserNeeds", userNeedsSchema);
export default UserNeeds;
