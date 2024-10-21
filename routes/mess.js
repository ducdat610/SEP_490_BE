import express from "express";
import { addMessage, getMessages } from "../controllers/MessageController.js";

const messRouter = express.Router();

messRouter.post("/", addMessage);

messRouter.get("/:chatId", getMessages);

export default messRouter;
