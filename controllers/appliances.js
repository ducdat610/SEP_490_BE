import { appliancesDao } from "../dao/index.js";

const getAllAppliances = async (req, res) => {
  try {
    const allAppliances = await appliancesDao.fetchAllAppliances();
    res.status(200).json(allAppliances);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
export default { getAllAppliances };
