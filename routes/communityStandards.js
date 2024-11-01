import express from "express";
import { communityStandardsController } from "../controllers/index.js";

const communityStandardsRouter = express.Router();

communityStandardsRouter.get('/', communityStandardsController.getAllCommunityStandards)

export default communityStandardsRouter;