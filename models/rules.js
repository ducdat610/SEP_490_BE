import mongoose, { Schema } from "mongoose";

const rulesSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Rules = mongoose.model("rules", rulesSchema);
export default Rules;
