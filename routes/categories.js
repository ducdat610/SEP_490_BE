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
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error); // Ghi log lỗi để dễ dàng theo dõi
    res.status(500).json({ message: "Internal Server Error" });
  }
});
categoriesRouter.post("/", async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const nameExit = await Categories.findOne({ name: name }).exec();
    if (nameExit) {
      return res
        .status(400)
        .json({ message: "Categories name already exists" });
    }

    const newCate = new Categories({ name, description });
    await newCate.save();
    res.status(200).json(newCate);
  } catch (error) {
    next(error);
  }
});
categoriesRouter.put("/:id", async (req, res, next) => {});
export default categoriesRouter;
