import { spaceController } from "../controllers/index.js";
import express from "express";

import createError from "http-errors";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} from "../helpers/jwt_helper.js";
import Spaces from "../models/spaces.js";

const spaceRouter = express.Router();
spaceRouter.get("/", spaceController.getAllSpaces);

// tim kiem space
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
    throw new Error(error.toString());

  }
})
spaceRouter.post("/", spaceController.createNewSpace);


// get theo id
spaceRouter.get('/cate/:id', spaceController.getSimilarSpaces)

// so sánh
spaceRouter.get("/compare-spaces", async (req, res) => {
  const { id1, id2 } = req.query;

  try {
    // search hai sản phẩm
    const space1 = await Spaces.findById(id1);
    const space2 = await Spaces.findById(id2);

    // nếu not found
    if (!space1 || !space2) {
      return res.status(404).json({ message: "Không tìm thấy một hoặc cả hai sản phẩm" });
    }

    // So sánh các trường in ra những trường khác 
    const differences = {};

    if (space1.name !== space2.name) {
      differences.name = { space1: space1.name, space2: space2.name };
    }

    if (space1.description !== space2.description) {
      differences.description = { space1: space1.description, space2: space2.description };
    }

    if (space1.location !== space2.location) {
      differences.location = { space1: space1.location, space2: space2.location };
    }

    if (space1.area !== space2.area) {
      differences.area = { space1: space1.area, space2: space2.area };
    }

    if (space1.pricePerHour !== space2.pricePerHour) {
      differences.pricePerHour = { space1: space1.pricePerHour, space2: space2.pricePerHour };
    }

    if (space1.status !== space2.status) {
      differences.status = { space1: space1.status, space2: space2.status };
    }

    // compare ảnh
    // if (JSON.stringify(space1.images) !== JSON.stringify(space2.images)) {
    //   differences.images = { space1: space1.images, space2: space2.images };
    // }

    // nếu k khác
    if (Object.keys(differences).length === 0) {
      return res.json({ message: "Hai sản phẩm giống nhau" });
    }

    // return những cái khác
    res.json(differences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi so sánh sản phẩm" });
  }
});

spaceRouter.get("/:id", async (req, res, next) => {
  const { spaceId } = req.body;
  try {
    const space = await Spaces.findOne({ spaceId }).exec();
    if (!space) {
      throw createError(400, "Space not found");
    }
    res.status(200).json(space);
  } catch (error) {
    next(error);
  }
});

spaceRouter.get('/cate/:id', spaceController.getSimilarSpaces)


// Từ chối post 
spaceRouter.put("/update-censorship/:id", async (req, res, next) => {
  try {
    const { rulesId } = req.body; 
    const updatedPost = await Spaces.findByIdAndUpdate(
      req.params.id,
      { censorship: "Từ chối", rulesId }, 
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Không tìm thấy post" });
    }

    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});


export default spaceRouter;


