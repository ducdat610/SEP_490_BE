import express from "express";
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
spaceRouter.get("/cate/:id", spaceController.getSimilarSpaces);

export default spaceRouter;
