import { reviewDao } from "../dao/index.js";

const getReviewBySId = async (req, res) => {
  try {
    const review = req.params.id;
    const allReview = await reviewDao.fetchReviewBySId(review);
    if (allReview) {
      res.status(200).json(allReview);
    } else {
      res.status(404).json({ message: "Not found review" });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const deleteReviewBySId = async (req, res) => {
  try {
    const removeReview = await reviewDao.deleteReviewBySId(req.params.id);
    if (removeReview) {
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ message: "Not found review" });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const editReviewBySId = async (req, res) => {
  try {
    req.body;
    const editReview = await reviewDao.editReviewBySId(req.params.id, req.body);
    if (editReview) {
      res.status(200).json({ message: "Review edited successfully" });
    } else {
      res.status(404).json({ message: "Not found review" });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const createReview = async (req, res) => {
  try {
    const { text, rating, spaceId, userId } = req.body;
    const newReview = await reviewDao.createReview(
      text,
      rating,
      spaceId,
      userId
    );
    res.status(201).json({ message: "review added successfully", newReview });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

const addReplyToReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { text, userId } = req.body;
    const replyData = { text, userId };
    const updatedReview = await reviewDao.addReplyToReview(reviewId, replyData);

    if (updatedReview) {
      res
        .status(200)
        .json({ message: "Reply added successfully", updatedReview });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export default {
  getReviewBySId,
  deleteReviewBySId,
  editReviewBySId,
  createReview,
  addReplyToReview,
};
