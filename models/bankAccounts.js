import mongoose, { Schema } from "mongoose";

const bankAccountSchema = new Schema(
  {
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BankAccount = mongoose.model("bankAccount", bankAccountSchema);

export default BankAccount;
