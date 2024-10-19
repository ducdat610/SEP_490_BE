import { spaceController } from "../controllers/index.js";
import express from "express";

import Spaces from "../models/spaces.js";
import createError from "http-errors";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} from "../helpers/jwt_helper.js";
import Users from "../models/users.js";
import Appliances from "../models/appliances.js";

const spaceRouter = express.Router();
spaceRouter.get("/", spaceController.getAllSpaces);
spaceRouter.put("/:id/favorite", spaceController.changeFavoriteStatus);
spaceRouter.get("/favorite", spaceController.getAllSpaceFavorites);

// tim kiem space
spaceRouter.get("/search/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(name);

    const searchResult = await Spaces.find({
      name: { $regex: searchRgx, $options: "i" },
    });
    res.send(searchResult);
  } catch (error) {
    throw new Error(error.toString());
  }
});

spaceRouter.get("/filter", async (req, res, next) => {
  try {
    const { location, minPrice, maxPrice, category, area, applianceName } =
      req.query;

    // Khởi tạo đối tượng filter rỗng
    let filter = {};

    // Lọc theo địa chỉ
    if (location) {
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`, "i"); // i: không phân biệt chữ hoa/thường
      filter.location = { $regex: rgx(location) };
    }
    if (area) {
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`, "i");
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
    if (applianceName) {
      const appliances = await Appliances.find({
        "appliances.name": { $regex: new RegExp(applianceName, "i") }, // Dùng regex để tìm tên appliance
      }).select("_id");
      if (appliances.length > 0) {
        filter.appliancesId = {
          $in: appliances.map((appliance) => appliance._id),
        }; // Thêm vào filter
      } else {
        // Nếu không tìm thấy appliance nào, có thể trả về danh sách rỗng hoặc thông báo
        return res.status(200).json([]);
      }
    }
    // Thực hiện truy vấn với filter đã tạo
    const filteredSpaces = await Spaces.find(filter)
      // .populate("categories") // Nếu cần populate thêm thông tin của thể loại
      // .populate("rules") // Nếu cần populate thêm thông tin khác
      .populate("categoriesId") // Nếu cần populate thêm thông tin của thể loại
      .populate("rulesId") // Nếu cần populate thêm thông tin khác
      .populate("appliancesId")
      .exec();

    res.status(200).json(filteredSpaces);
  } catch (error) {
    throw new Error(error.toString());
  }
});
spaceRouter.post("/", spaceController.createNewSpace);

// get theo id
spaceRouter.get("/cate/:id", spaceController.getSimilarSpaces);

// so sánh
spaceRouter.get("/compare-spaces-differences", async (req, res) => {
  const { id1, id2 } = req.query;

  try {
    // search hai sản phẩm
    const space1 = await Spaces.findById(id1);
    const space2 = await Spaces.findById(id2);

    // nếu not found
    if (!space1 || !space2) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy một hoặc cả hai sản phẩm" });
    }

    // So sánh các trường in ra những trường khác
    const differences = {};

    const image1 =
      space1.images && space1.images.length > 0 ? space1.images[0] : null;
    const image2 =
      space2.images && space2.images.length > 0 ? space2.images[0] : null;

    differences.images = { space1: image1, space2: image2 };

    if (space1.name !== space2.name) {
      differences.name = { space1: space1.name, space2: space2.name };
    }

    if (space1.location !== space2.location) {
      differences.location = {
        space1: space1.location,
        space2: space2.location,
      };
    }

    if (space1.area !== space2.area) {
      differences.area = { space1: space1.area, space2: space2.area };
    }

    if (space1.pricePerHour !== space2.pricePerHour) {
      differences.pricePerHour = {
        space1: space1.pricePerHour,
        space2: space2.pricePerHour,
      };
    }

    if (space1.status !== space2.status) {
      differences.status = { space1: space1.status, space2: space2.status };
    }

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

spaceRouter.get("/compare-spaces", async (req, res) => {
  const { id1, id2 } = req.query;

  try {
    // Tìm kiếm hai sản phẩm
    const space1 = await Spaces.findById(id1);
    const space2 = await Spaces.findById(id2);

    // Nếu không tìm thấy
    if (!space1 || !space2) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy một hoặc cả hai sản phẩm" });
    }

    // Tạo đối tượng để chứa thông tin so sánh
    const comparisonResult = {
      space1: {
        images:
          space1.images && space1.images.length > 0 ? space1.images[0] : null,
        // id: space1._id,
        name: space1.name,
        location: space1.location,
        area: space1.area,
        pricePerHour: space1.pricePerHour,
        status: space1.status,
        images:
          space1.images && space1.images.length > 0 ? space1.images[0] : null,
      },
      space2: {
        images:
          space2.images && space2.images.length > 0 ? space2.images[0] : null,
        // id: space2._id,
        name: space2.name,
        location: space2.location,
        area: space2.area,
        pricePerHour: space2.pricePerHour,
        status: space2.status,
      },
    };

    // Trả về tất cả thông tin của hai sản phẩm
    res.json(comparisonResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi so sánh sản phẩm" });
  }
});

spaceRouter.get("/:id", async (req, res, next) => {
  try {
    const space = await Spaces.findById(req.params.id)
      .populate("userId")
      .populate("rulesId")
      .populate("appliancesId")
      .populate("categoriesId")
      .exec();
    if (!space) {
      throw createError(400, "Space not found");
    }

    res.status(200).json(space);
  } catch (error) {
    next(error);
  }
});
// Get Space theo UseId
spaceRouter.get("/for/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await Spaces.find({ userId: userId }).exec();

    if (!user) {
      return res.status(404).json({ message: "Space not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin ", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông tin " });
  }
});
// Từ chối post
spaceRouter.put("/update-censorship/:id", async (req, res, next) => {
  try {
    const { communityStandardsId } = req.body;
    const updatedPost = await Spaces.findByIdAndUpdate(
      req.params.id,
      { censorship: "Từ chối", communityStandardsId },
      { new: true }
    ).populate("communityStandardsId");

    if (!updatedPost) {
      return res.status(404).json({ message: "Không tìm thấy post" });
    }

    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// chấp nhận post
spaceRouter.put("/update/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { censorship } = req.body;

  try {
    const postSpace = await Spaces.findOneAndUpdate(
      { _id: postId },
      { censorship: censorship },
      { new: true }
    );

    if (!postSpace) {
      return res.status(404).json({ message: "PostSpace not found" });
    }

    res.status(200).json(postSpace);
  } catch (error) {
    next(error);
  }
});
// spaceRouter.get("/spaces/:id", spaceController.getSpaceByUserId);

export default spaceRouter;
