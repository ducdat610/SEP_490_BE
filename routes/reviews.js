import express from "express";
import { reviewController } from "../controllers/index.js";

const reviewRouter = express.Router()
reviewRouter.get('/:id', reviewController.getReviewBySId)
reviewRouter.delete('/:id', reviewController.deleteReviewBySId)
reviewRouter.put('/:id', reviewController.editReviewBySId)
reviewRouter.post('/', reviewController.createReview)
export default reviewRouter;