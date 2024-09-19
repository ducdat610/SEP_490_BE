
import Spaces from "../models/spaces.js"

const fetchSimilarSpaces = async (id) =>{
    try {
        const spaceId = await Spaces.find({categoriesId: id})
        // .populate('rules')
        // .populate('appliances')
        .populate('categoriesId')
        .populate('reviews')
        return spaceId
    } catch (error) {
        throw new Error(error.toString());
    }
}
export default {fetchSimilarSpaces}
