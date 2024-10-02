import { reportsDao } from "../dao/index.js";

const getAllReports = async(req, res) =>{
  try {
    const allReports = await reportsDao.fetchAllReports()
    res.status(200).json(allReports)
  } catch (error) {
    throw new Error(error.message)
  }
}

const createReports = async (req, res) => {
  try {
    const { reasonId, userId, spaceId } = req.body;
    const report = await reportsDao.createReports(reasonId, userId, spaceId);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

export default { createReports,getAllReports };
