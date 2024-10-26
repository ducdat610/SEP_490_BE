import mongoose, { Schema } from "mongoose";
const bankSchema = new Schema(
  {
    bankName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Bank = mongoose.model("bank", bankSchema);

export default Bank;
