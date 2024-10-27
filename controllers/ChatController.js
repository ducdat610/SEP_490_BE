import ChatModel from "../models/chatModel.js";

// Create a new chat
export const createChat = async (req, res) => {
  const { senderId, receiverId, spacesId } = req.body; // Thay đổi productId thành spacesId

  console.log("Request Body:", req.body); // Thêm dòng này để kiểm tra

  if (!senderId || !receiverId) {
    return res
      .status(400)
      .json({ message: "Sender and Receiver IDs are required." });
  }

  const newChat = new ChatModel({
    members: [senderId, receiverId],
    spacesId: spacesId, // Đảm bảo spacesId được truyền đúng
  });

  try {
    const result = await newChat.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all chats for a user
export const userChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await ChatModel.find({
      members: { $in: [userId] },
    }).populate("spacesId");
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find a specific chat between two users
export const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await ChatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found." });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a chat's product ID
export const updateChat = async (req, res) => {
  const { chatId } = req.params;
  const { spacesId } = req.body;

  // Validate request body
  if (!spacesId) {
    return res.status(400).json({ message: "Product ID is required." });
  }

  try {
    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      { $set: { spacesId: spacesId } },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found." });
    }

    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
