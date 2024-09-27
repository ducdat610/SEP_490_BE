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
      // validate: {
      //   validator: function (v) {
      //     return v.length >= 1 && v.length <= 5; // Kiểm tra số lượng tài khoản ngân hàng
      //   },
      //   message: (props) => `Số lượng tài khoản ngân hàng đã quá giới hạn`,
      // },
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
