import Spaces from "../models/spaces.js";

const fetchAllSpaces = async () => {
  try {
    return await Spaces.find({}).populate("appliancesId").populate("userId").exec()
  } catch (error) {
    throw new Error(error.toString());
  }
}
const fetchSpaceByUserId = async (id) => {
  try {
    const userId = await Spaces.find({userId: id}).populate("userId").exec()
    return userId
  } catch (error) {
    throw new Error(error.toString());
  }
}
const fetchAllSpaceFavorite = async () => {
  try {
    return await Spaces.find({ favorite: true }).populate("appliancesId").exec()
  } catch (error) {
    throw new Error(error.toString());
  }
}

const fetchSimilarSpaces = async (id) => {
  try {
    const spaceId = await Spaces.find({ categoriesId: id })
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
    console.error("Error saving space to database:", error); 
    throw new Error('Error creating space in DAO');
  }
};
export default { fetchAllSpaces, fetchSimilarSpaces, createSpace,fetchAllSpaceFavorite, fetchSpaceByUserId }
