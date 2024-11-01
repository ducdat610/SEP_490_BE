import { communityStandardsDao } from "../dao/index.js";
import CommunityStandards from "../models/communityStandards.js";

const getAllCommunityStandards = async (req, res) => {
  try {
    const community = await communityStandardsDao.fetchAllCommunityStandards();
    res.status(200).json(community)
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCommunityStandards = async (req, res) => {
  try {
    const { id } = req.params; // ID của community standards cần cập nhật
    const { reasons, customReason } = req.body; // Thông tin cần cập nhật

    // Kiểm tra xem id có tồn tại không
    const communityStandards = await CommunityStandards.findById(id);
    if (!communityStandards) {
      return res.status(404).json({ success: false, message: "Community Standards not found" });
    }

    // Cập nhật thông tin
    if (reasons) communityStandards.reasons = reasons;
    if (customReason) communityStandards.customReason = customReason;

    // Lưu các thay đổi
    await communityStandards.save();

    return res.status(200).json({ success: true, communityStandards });
  } catch (error) {
    console.error("Error updating community standards:", error);
    return res.status(500).json({ success: false, message: `Error updating community standards: ${error.message}` });
  }
};

export default { getAllCommunityStandards,updateCommunityStandards };
