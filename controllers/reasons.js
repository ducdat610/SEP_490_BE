import { reasonsDao } from "../dao/index.js";

const getAllReasons = async (req, res) => {
  try {
    const allReasons = await reasonsDao.fetchAllReasons();
    res.status(200).json(allReasons);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
export default { getAllReasons };
