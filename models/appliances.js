import mongoose, { Schema } from "mongoose";

const appliancesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    appliances: [
      {
        name: {
          type: String,
          required: true,
        },
        iconName: {
          type: String,
          required: true,
        },
      },
    ],
    categoryId: {
      type: Schema.Types.ObjectId, 
      ref: "categories", 
      required: true,
    },
  },
  
  {
    timestamps: true,
  }
);

const Appliances = mongoose.model("appliances", appliancesSchema);
export default Appliances;
