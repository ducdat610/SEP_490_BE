import express from "express";
import { reviewController } from "../controllers/index.js";

const reviewRouter = express.Router()
reviewRouter.get('/:id', reviewController.getReviewBySId)

export default reviewRouter;