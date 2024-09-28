import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    messageContent: {
<<<<<<< HEAD
      type: [String],
=======
      type: [String] ,
>>>>>>> 63bd77bf9366b67713fd015ecce615b15df893d6
      required: true,
    },
    spaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "spaces",
      required: false,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("messages", messageSchema);
export default Message;
