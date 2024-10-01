import mongoose, { Schema } from "mongoose";

const appliancesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    appliances: [String],
  },
  {
    timestamps: true,
  }
);

const Appliances = mongoose.model("appliances", appliancesSchema);
export default Appliances;
