import { spaceDao,appliancesDao } from "../dao/index.js";
import Spaces from "../models/spaces.js";
const getAllSpaces = async (req, res) => {
  try {
    const allSpaces = await spaceDao.fetchAllSpaces();
    res.status(200).json(allSpaces)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
}

//get space favorite
const getAllSpaceFavorites = async (req, res) => {
  try {
    const allSpaces = await spaceDao.fetchAllSpaceFavorite();
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

// Tạo mới một không gian
export const createNewSpace = async (req, res) => {
  try {
    const { name, description, location, area, rulesId, pricePerHour, images, categoriesId, appliances, customAppliances } = req.body;

    // Thêm các tiện ích tùy chỉnh
    const customApplianceIds = [];
    if (customAppliances && customAppliances.length > 0) {
      for (const appliance of customAppliances) {
        const newAppliance = await appliancesDao.addCustomAppliance({
          name: appliance.name,
          description: appliance.description || "",
          isCustom: true,
        });
        customApplianceIds.push(newAppliance._id);
      }
    }

    // Kết hợp tiện ích có sẵn và tùy chỉnh
    const allApplianceIds = [...appliances, ...customApplianceIds];

    const spaceData = {
      name,
      description,
      location,
      area,
      rulesId,
      pricePerHour,
      images,
      categoriesId,
      appliancesId: allApplianceIds,
    };

    const newSpace = await spaceDao.createSpace(spaceData);
    console.log("Space created successfully:", newSpace);

    return res.status(201).json({ success: true, space: newSpace });
  } catch (error) {
    console.error("Error creating space:", error);
    return res.status(500).json({ success: false, message: `Error creating space: ${error.message}` });
  }
};


const changeFavoriteStatus = async (req, res) => {
  try {
    const spaceId = req.params.id;

    // Tìm không gian theo ID
    const space = await Spaces.findById(spaceId);

    if (!space) {
      return res.status(404).json({ message: "Không gian không tồn tại" });
    }

    // Đảo ngược trạng thái của favorite
    space.favorite = !space.favorite;

    // Lưu lại thay đổi
    await space.save();

    return res.status(200).json({
      message: "Đã thay đổi trạng thái yêu thích thành công",
      favorite: space.favorite,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi hệ thống",
      error: error.message,
    });
  }
};


export default { getAllSpaces, getSimilarSpaces,createNewSpace,changeFavoriteStatus,getAllSpaceFavorites }
