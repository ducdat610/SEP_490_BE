import Spaces from "../models/spaces.js";

const fetchAllSpaces = async() =>{
  try {
    return await Spaces.find({}).exec()
  } catch (error) {
    throw new Error(error.toString());
  }
}
export default {fetchAllSpaces};