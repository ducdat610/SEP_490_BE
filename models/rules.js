import mongoose, { Schema } from "mongoose";

const rulesSchema = new Schema(
  {
    rules: {
      type: [String], 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Rules = mongoose.model("rules", rulesSchema);

export default Rules;