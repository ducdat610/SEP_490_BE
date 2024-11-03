import cloudinary from "../cloudinary.config.js";
import { spaceDao, appliancesDao } from "../dao/index.js";
import CommunityStandards from "../models/communityStandards.js";
import Spaces from "../models/spaces.js";
import mongoose from "mongoose";

import pkg from 'cloudinary'; // Nhập package cloudinary dưới dạng mặc định
const getAllSpacesApply = async (req, res) => {
  try {
    const allSpaces = await spaceDao.fetchAllSpacesApply();
    res.status(200).json(allSpaces)
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
}
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



const createNewSpace = async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      area,
      rulesId,
      userId,
      pricePerHour,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
      images,
      censorship,
      status,
      categoriesId,
      appliancesId,
      reportCount,
      isGoldenHour,
      goldenHourDetails,
      favorite,
      latLng,
    } = req.body;

    let formattedImages = [];
    if (Array.isArray(images)) {
      formattedImages = images.map(img => ({
        public_id: img.public_id,
        url: img.url
      }));
    } else if (images && images.public_id && images.url) {
      formattedImages = [{
        public_id: images.public_id,
        url: images.url
      }];
    }
    const communityStandardsId = new mongoose.Types.ObjectId();

    const newCommunityStandards = new CommunityStandards({
      _id: communityStandardsId,
      reasons: [],
      customReason: []
    });
    await newCommunityStandards.save();





    const spaceData = {
      name,
      description,
      location,
      area,
      rulesId,
      userId,
      pricePerHour,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
      images: formattedImages,
      censorship,
      status,
      categoriesId,
      appliancesId,
      reportCount,
      isGoldenHour,
      goldenHourDetails,
      communityStandardsId: communityStandardsId, // Gán ID đã tạo cho space
      favorite,
      latLng,
      locationPoint: {type: "Point", coordinates: latLng && latLng.length === 2 ? [latLng[1], latLng[0]] : null}
    };
    const newSpace = await Spaces.create(spaceData); // Tạo không đồng bộ

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

const removeImages = async (req, res) => {
  try {
    const { public_id } = req.body; // Lấy public_id từ body của request

    // Sử dụng cloudinary.uploader.destroy với await
    const result = await cloudinary.uploader.destroy(public_id);

    // Kiểm tra kết quả từ cloudinary và trả về phản hồi thích hợp
    if (result.result === 'ok') {
      return res.status(200).json({ message: 'Image deleted successfully' });
    } else {
      return res.status(400).json({ message: 'Failed to delete image', result });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const uploadImages = async (req, res) => {
  try {
    // Lấy thông tin ảnh từ req.files
    const images = req.files.map(file => ({
      url: file.path, // URL của ảnh đã được upload
      public_id: file.filename, // public_id của ảnh
    }));

    return res.status(200).json({
      message: 'Images uploaded successfully',
      images: images, // Trả về danh sách ảnh
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

const deleteSpace = async (req, res) => {
  try {
    const deleteSpace = await spaceDao.deleteSpace(req.params.id);
    res.status(200).json(deleteSpace);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
    console.log('Failed to delete product');
  }
};


const updateSpaceCensorshipAndCommunityStandards = async (req, res) => {
  try {

    const spaceId = req.params.id;
    const { censorship, reasons, customReason } = req.body;


    // Cập nhật trạng thái censorship của space
    const updatedSpace = await Spaces.findByIdAndUpdate(
      spaceId,
      { censorship, reasons, customReason }, // Các trường cần thiết
      { new: true } // Trả về tài liệu đã cập nhật
    ).populate("communityStandardsId");

    // Cập nhật mảng reasons và customReason của communityStandards
    const communityStandards = await CommunityStandards.findById(updatedSpace.communityStandardsId);
    if (communityStandards) {
      communityStandards.reasons = reasons; // Cập nhật lý do
      communityStandards.customReason = customReason; // Cập nhật lý do tùy chỉnh
      await communityStandards.save(); // Lưu thay đổi
    }


    return res.status(200).json({ success: true, space: updatedSpace });
  } catch (error) {
    console.error('Error updating space and community standards:', error);
    return res.status(500).json({ success: false, message: 'Error updating space and community standards' });
  }
};


export default {
  getAllSpaces,
  getSimilarSpaces,
  createNewSpace,
  changeFavoriteStatus,
  getAllSpaceFavorites,
  removeImages,
  uploadImages,
  getAllSpacesApply,
  deleteSpace,
  updateSpaceCensorshipAndCommunityStandards
}
