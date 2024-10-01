import mongoose, { Schema } from "mongoose";

const spacesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    rulesId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rules",
        required: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    images: [{ type: String }],
    censorship: {
      type: String,
      enum: ["Chờ duyệt", "Chấp nhận ", "Từ chối"],
      default: "Chờ duyệt",
    },
    status: {
      type: String,
      enum: ["Đang sử dụng", "Đang dọn dẹp ", "Còn trống"],
      default: "Đang sử dụng",
    },
    categoriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    appliancesId:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appliances",
      required: true,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
        require: false,
      },
    ],
    reportCount: {
      type: Number,
      default: 0,
    },
    favorite:{
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Spaces = mongoose.model("spaces", spacesSchema);

export default Spaces;
