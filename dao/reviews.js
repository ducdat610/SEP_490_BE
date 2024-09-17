import Reviews from "../models/reviews.js"

const fetchReviewBySId = async(id) =>{
    try {
        const allReview = await Reviews.find({spaceId: id})
        .populate("userId")
        .exec()
        return allReview
    } catch (error) {
        throw new Error(error.toString())
    }
}

export default {fetchReviewBySId}