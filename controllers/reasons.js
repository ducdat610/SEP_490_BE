import { reasonsDao } from "../dao/index.js";

const getReportBySId = async (req, res) => {
  try {
    const report = await reasonsDao.fetchReportBySId(req.params.id).exec();
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
export default { getReportBySId };
