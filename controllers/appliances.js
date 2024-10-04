import { appliancesDao } from "../dao/index.js";


// Lấy các tiện ích có sẵn
export const getAllAppliances = async (req, res) => {
  try {
    const appliances = await appliancesDao.fetchAllAppliances();
    return res.status(200).json(appliances);
  } catch (error) {
    console.error("Error fetching appliances:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllAppliancesByCategories = async (req, res) => {
  try {
    const categoryId = req.params.cateid
    const appliances = await appliancesDao.fetchAllAppliancesCategories(categoryId);
    return res.status(200).json(appliances);
  } catch (error) {
    console.error("Error fetching appliances:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default { getAllAppliances, getAllAppliancesByCategories };
