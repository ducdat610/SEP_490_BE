import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
    },
    avatar:{
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
export default User;
