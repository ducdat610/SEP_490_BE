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
    customeRules:{
      type: [String],
      required: false,
    }
  },
  {
    timestamps: true, 
  }
);

const Rules = mongoose.model("rules", rulesSchema);

export default Rules;