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
export default { getReviewBySId, deleteReviewBySId, editReviewBySId };
