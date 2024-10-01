import Spaces from "../models/spaces.js";

const fetchAllSpaces = async() =>{
  try {
    return await Spaces.find({}).populate("appliancesId").populate("userId").exec()
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


export const createSpace = async (spaceData) => {
  try {
    const newSpace = new Spaces(spaceData);
    await newSpace.save();
    return newSpace;
  } catch (error) {
    console.error("Error saving space to database:", error); // Log lỗi chi tiết
    throw new Error('Error creating space in DAO');
  }
};
export default {fetchAllSpaces,fetchSimilarSpaces,createSpace}
