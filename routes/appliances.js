import express from "express";
import { appliancesController } from "../controllers/index.js";

const appliancesRouter = express.Router();

appliancesRouter.get("/", appliancesController.getAllAppliances);
appliancesRouter.get("/:cateid", appliancesController.getAllAppliancesByCategories);
appliancesRouter.post("/", appliancesController.createAppliance);

export default appliancesRouter;
