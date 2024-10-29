import express from "express";
import { communityStandardsController } from "../controllers/index.js";

const communityStandardsRouter = express.Router();

communityStandardsRouter.get('/', communityStandardsController.getAllCommunityStandards)
communityStandardsRouter.post('/addCom', communityStandardsController.addCommunityStandard)

export default communityStandardsRouter;