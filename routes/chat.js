import express from "express";
import {
  createChat,
  findChat,
  userChats,
  updateChat,
} from "../controllers/ChatController.js";
const chatRouter = express.Router();

chatRouter.post("/", createChat);
chatRouter.put("/:chatId", updateChat);
chatRouter.get("/:userId", userChats);
chatRouter.get("/:firstId/:secondId", findChat);

export default chatRouter;
