import { spaceController } from "../controllers/index.js";
import express from "express";

const spaceRouter = express.Router();
spaceRouter.get("/", spaceController.getAllSpaces);
export default spaceRouter;
