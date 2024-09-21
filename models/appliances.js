import mongoose, { Schema } from "mongoose";

const appliancesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Appliances = mongoose.model("appliances", appliancesSchema);
export default Appliances;
