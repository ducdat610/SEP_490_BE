import express from "express";
import { spaceController } from "../controllers/index.js";

const spaceRouter = express.Router()
spaceRouter.get('/cate/:id', spaceController.getSimilarSpaces)

export default spaceRouter