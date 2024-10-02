import express from "express";
import { reportsController } from "../controllers/index.js";

const reportRouter = express.Router();
reportRouter.post("/", reportsController.createReports);
reportRouter.get("/", reportsController.getAllReports);

export default reportRouter;
