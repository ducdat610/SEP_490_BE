import Spaces from "../models/spaces.js";

const fetchAllSpaces = async() =>{
  try {
    return await Spaces.find({}).exec()
  } catch (error) {
    throw new Error(error.toString());
  }
}


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
export default {fetchAllSpaces,fetchSimilarSpaces}
