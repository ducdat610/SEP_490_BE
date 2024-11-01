import express from "express";
import { communityStandardsController } from "../controllers/index.js";

const communityStandardsRouter = express.Router();

communityStandardsRouter.get('/', communityStandardsController.getAllCommunityStandards)
communityStandardsRouter.put('/communityStandards/:id', communityStandardsController.updateCommunityStandards);

export default communityStandardsRouter;