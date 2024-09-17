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
      default: "",
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
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "banks",
    },
    isSpaceOwners:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", usersSchema);
export default Users;
