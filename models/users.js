import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    fullname: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    gmail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", ""],
      default: "",
    },
    birthday: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      default: 0,
    },
    isBan: {
      type: Boolean,
      default: false,
    },
    bankAccounts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "bankAccount",
    },
    defaultBankAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bankAccount",
      default: null,
    },
    isSpaceOwners: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Users = mongoose.model("users", usersSchema);
export default Users;
