import Reviews from "../models/reviews.js";

const fetchReviewBySId = async (id) => {
  try {
    const allReview = await Reviews.find({ spaceId: id })
      .populate("userId")
      .exec();
    return allReview;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const deleteReviewBySId = async (id) => {
  try {
    const deleteReviewBySId = await Reviews.deleteOne({ _id: id }).exec();
    return deleteReviewBySId;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const editReviewBySId = async (id, newData) => {
  try {
    const editReview = await Reviews.findOneAndUpdate({ _id: id }, newData, {
      new: true,
    }).exec();
    return editReview;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const createReviewsBySId = async (text, rating, spaceId, userId) => {
  try {
    const createReviewsBySId = await Reviews.create({
      text,
      rating,
      spaceId,
      userId,
    });
    return createReviewsBySId;
  } catch (error) {
    throw new Error(error.toString());
  }
};
const addReplyToReview = async (id, replyData) => {
  try {
    const review = await Reviews.findById(id);
    if (review) {
      review.replies.push(replyData);
      await review.save();
      return review;
    } else {
      throw new Error("Review not found");
    }
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default {
  fetchReviewBySId,
  deleteReviewBySId,
  editReviewBySId,
  createReviewsBySId,
  addReplyToReview,
};
