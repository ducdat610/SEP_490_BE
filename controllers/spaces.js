import { spaceDao } from "../dao/index.js";
const getAllSpaces = async (req, res) => {
  try {
    const allSpaces = await spaceDao.fetchAllSpaces();
    res.status(200).json(allSpaces)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
}



const getSimilarSpaces = async (req, res) => {
  try {
    const similarSpaces = req.params.id
    const spaces = await spaceDao.fetchSimilarSpaces(similarSpaces)
    if (spaces) {
      res.status(200).json(spaces)
    } else {
      res.status(400).json({ message: 'not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() })
  }
}

export default { getAllSpaces, getSimilarSpaces }
