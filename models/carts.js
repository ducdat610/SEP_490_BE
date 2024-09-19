import mongoose, { Schema } from "mongoose";

const cartsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "spaces",
    required: true,
  },
  categoriesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  }
});
const Carts = new mongoose.model("carts", cartsSchema);
export default Carts;
