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


// Hàm thêm appliance mới
 const createAppliance = async (req, res) => {
  try {
    const { name, appliances, categoryId } = req.body;

    // Kiểm tra các trường hợp thiếu dữ liệu cần thiết
    if (!name || !appliances || appliances.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Tạo dữ liệu appliance mới
    const applianceData = {
      name,
      appliances,
      categoryId: categoryId || '', // Có thể để trống nếu không có categoryId
    };

    // Thêm appliance mới qua DAO
    const newAppliance = await appliancesDao.addAppliance(applianceData);

    return res.status(201).json({ success: true, appliance: newAppliance });
  } catch (error) {
    console.error('Error creating appliance:', error);
    return res.status(500).json({ success: false, message: 'Error creating appliance' });
  }
};

export default { getAllAppliances, getAllAppliancesByCategories,createAppliance };
