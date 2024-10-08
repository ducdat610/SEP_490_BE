import mongoose, { Schema } from "mongoose";

const appliancesSchema = new Schema(
  {
    name: {
      type: String,
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
    },
  },
  
  {
    timestamps: true,
  }
);

const Appliances = mongoose.model("appliances", appliancesSchema);
export default Appliances;
