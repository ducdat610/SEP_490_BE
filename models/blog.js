import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: false,
      },

    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
        required: false,
      },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
}, {
    timestamps: true
});

const Blog = mongoose.model("blogs", blogSchema);

export default Blog;
