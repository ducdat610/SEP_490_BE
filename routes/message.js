import express from "express";
import { messageController } from "../controllers/index.js";

const messageRouter = express.Router();

messageRouter.post("/", messageController.sendMessage);
messageRouter.get('/:userId/:receiverId', messageController.getMessagesBetweenUsers);

export default messageRouter;