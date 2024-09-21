import express from "express";
import { reasonsController } from "../controllers/index.js";

const reasonsRouter = express.Router();

reasonsRouter.get("/:id", reasonsController.getReportBySId);

export default reasonsRouter;
