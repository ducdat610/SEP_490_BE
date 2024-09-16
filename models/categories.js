import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema(
    {
        name: {
          type: String,
          required: true,
          unique: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
      }
)
const Categories = mongoose.model("categories", categoriesSchema);

export default Categories;