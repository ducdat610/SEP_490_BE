import { spaceDao } from "../dao/index.js";
const getAllSpaces = async (req, res) =>{
  try {
    const allSpaces = await spaceDao.fetchAllSpaces();
    res.status(200).json(allSpaces)
  } catch (error) {
    res.status(500).json({error:error.toString()})
  }
}
export default {
    getAllSpaces
  };
  