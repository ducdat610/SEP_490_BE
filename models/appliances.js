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
  },
  {
    timestamps: true,
  }
);
const Appliance = mongoose.model("appliances", appliancesSchema);
export default Appliance;
