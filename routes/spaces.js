import express from "express";
import createError from "http-errors";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} from "../helpers/jwt_helper.js";
import { spaceController } from "../controllers/index.js";
import Spaces from "../models/spaces.js";
const spaceRouter = express();
spaceRouter.post("/", async (req, res, next) => {
  const {
    name,
    description,
    location,
    area,
    rulesId,
    pricePerHour,
    categories,
    appliancesId,
    reviews,
  } = req.body;
  try {
  } catch (error) {}
});

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

export default spaceRouter;


