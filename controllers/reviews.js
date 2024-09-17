import { reviewDao } from "../dao/index.js"

const getReviewBySId = async(req, res) => {
    try {
        const review = req.params.id
        const allReview = await reviewDao.fetchReviewBySId(review)
        if(allReview){
            res.status(200).json(allReview)
        }else{
            res.status(404).json({message: "Not found review"})
        }
    } catch (error) {
        res.status(500).json({message:error.toString()})
    }
}

export default {getReviewBySId}