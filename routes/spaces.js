import express from "express";
import Spaces from "../models/spaces.js";
import createError from "http-errors";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} from "../helpers/jwt_helper.js";
import { spaceController } from "../controllers/index.js";
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
spaceRouter.get("/similar/:id", async (req, res, next) => {
  try {
    const spaceId = req.params.id;
    const space = await Spaces.findById(spaceId);
    if (!space) {
      throw createError(404, "Không tìm thấy sản phẩm");
    }

    const similarSpaces = await Spaces.find({
      categories: space.categories,
      _id: { $ne: space._id },
    })
      .populate("categories")
      .exec();

    if (similarSpaces.length === 0) {
      throw createError(404, "Không tìm thấy không gian tương tự");
    }

    res.send(similarSpaces);
  } catch (error) {
    next(error);
  }
});

export default spaceRouter;
