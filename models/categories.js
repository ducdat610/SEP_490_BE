import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema(
    {
        name: {
          type: String,
          required: [true, "Space name is required"],
          unique: [true, "Space name is not duplicate"],
        },
        description: {
          type: String,
          required: true,
        },
        iconName:{
          type: String,
          required: true,
        }
      },
      {
        timestamps: true,
      }
)
const Categories = mongoose.model("categories", categoriesSchema);

export default Categories;