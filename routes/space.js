import express from "express";
import Spaces from "../models/spaces.js";
import createError from "http-errors";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} from "../helpers/jwt_helper.js";
const spaceRouter = express();
spaceRouter.get("/:id", async (req, res, next) => {
  const { spaceId } = req.params;
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
