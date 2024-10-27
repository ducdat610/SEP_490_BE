import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
    },
    spacesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "spaces",
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;
