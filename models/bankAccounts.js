import mongoose, { Schema } from "mongoose";

const bankAccountSchema = new Schema(
  {
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "banks",
      required: true,
    },
    userId: {
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
