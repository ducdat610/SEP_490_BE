import mongoose, { Schema } from "mongoose";

const bankSchema = new Schema(
  {
    bankName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bank = mongoose.model("banks", bankSchema);

export default Bank;
