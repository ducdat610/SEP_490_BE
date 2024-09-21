import express from "express";
import { reportsController } from "../controllers/index.js";

const reportRouter = express.Router();
reportRouter.post("/", reportsController.createReports);

export default reportRouter;
