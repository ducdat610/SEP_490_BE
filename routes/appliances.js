import express from "express";
import { appliancesController } from "../controllers/index.js";

const appliancesRouter = express.Router();

appliancesRouter.get("/", appliancesController.getAllAppliances);

export default appliancesRouter;
