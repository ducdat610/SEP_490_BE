import { spaceDao } from "../dao/index.js";

const getSimilarSpaces = async (req, res) => {
  try {
    const similarSpaces = req.params.id;
    const spaces = await spaceDao.fetchSimilarSpaces(similarSpaces);
    if (spaces) {
      res.status(200).json(spaces);
    } else {
      res.status(400).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export default { getSimilarSpaces };
