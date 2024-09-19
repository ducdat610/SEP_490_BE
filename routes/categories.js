import express from "express";
import { categoriesController } from "../controllers/index.js";

const categoriesRouter = express.Router()

categoriesRouter.get('/', categoriesController.getAllCategories)
export default categoriesRouter;
