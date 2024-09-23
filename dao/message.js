import Message from "../models/Message.js";

const sendMessage = async (userId, receiverId, messageContent, spaceId) => {
  try {
    const message = await Message.create({
      userId,
      receiverId,
      messageContent,
      spaceId,
    });
    await message.save();
  } catch (error) {
    throw new Error(error.toString());
  }
};
const getMessages = async (userId, receiverId, spaceId) => {
  try {
    const messages = await Message.find({
      $or: [
        { userId: userId, receiverId: receiverId, spaceId: spaceId },
        { userId: receiverId, receiverId: userId, spaceId: spaceId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("userId", "name");

    return messages;
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default { sendMessage, getMessages };
