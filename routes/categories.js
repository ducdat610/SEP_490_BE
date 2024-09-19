import express from "express";
import Categories from "../models/categories.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "../helpers/jwt_helper.js";

const categoriesRouter = express.Router();
categoriesRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Categories.find({}).exec();
    if (categories.length === 0) {
      res.status(404 + "Not Found");
    }
    res.status(200).json(categories);
  } catch (error) {}
});
export default categoriesRouter;
