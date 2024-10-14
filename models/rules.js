import mongoose, { Schema } from "mongoose";

const rulesSchema = new Schema(
  {
    name: {
      type: String,
    },
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