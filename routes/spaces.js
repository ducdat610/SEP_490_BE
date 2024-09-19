import { spaceController } from "../controllers/index.js";
import express from "express";
import Spaces from "../models/spaces.js";

const spaceRouter = express.Router();
spaceRouter.get("/", spaceController.getAllSpaces);


spaceRouter.get('/search/:name', async (req, res, next) => {
  try {
    const name = req.params.name
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(name);

    const searchResult = await Spaces.find({ name: { $regex: searchRgx, $options: "i" } })
    res.send(searchResult)
  } catch (error) {
    throw new Error(error.toString());

  }
})

spaceRouter.get("/filter", async (req, res, next) => {
  try {
    const { location, minPrice, maxPrice, category, area } = req.query;

    // Khởi tạo đối tượng filter rỗng
    let filter = {};

    // Lọc theo địa chỉ
    if (location) {
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`, 'i'); // i: không phân biệt chữ hoa/thường
      filter.location = { $regex: rgx(location) };
    }
    if (area) {
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`, 'i');
      filter.area = { $regex: rgx(area) }; // Dùng regex để tìm các giá trị có chứa chuỗi tương tự
    }

    // Lọc theo giá (nếu có cả minPrice và maxPrice)
    if (minPrice && maxPrice) {
      filter.pricePerHour = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      filter.pricePerHour = { $gte: minPrice };
    } else if (maxPrice) {
      filter.pricePerHour = { $lte: maxPrice };
    }

    // Lọc theo category
    if (category) {
      filter.categories = category; // Nếu category là ObjectId, cần truyền giá trị này là ID
    }

    // Thực hiện truy vấn với filter đã tạo
    const filteredSpaces = await Spaces.find(filter)
      .populate("categories") // Nếu cần populate thêm thông tin của thể loại
      .populate("rules")      // Nếu cần populate thêm thông tin khác
      .exec();

    res.status(200).json(filteredSpaces);
  } catch (error) {
    next(error);
  }
});

export default spaceRouter;
