import express from "express";
import { appliancesController } from "../controllers/index.js";

const appliancesRouter = express.Router();

appliancesRouter.get("/", appliancesController.getAllAppliances);
appliancesRouter.get("/def", appliancesController.getAllAppliancesDefault);

export default appliancesRouter;
