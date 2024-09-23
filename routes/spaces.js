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

// POST route for creating a space
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
    const newSpace = new Spaces({
      name,
      description,
      location,
      area,
      rulesId,
      pricePerHour,
      categories,
      appliancesId,
      reviews,
    });

    await newSpace.save();
    res.status(201).json(newSpace);
  } catch (error) {
    next(createError(500, "Unable to create space"));
  }
});

// GET route to fetch a specific space by ID
spaceRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const space = await Spaces.findById(id);
    if (!space) {
      throw createError(400, "Space not found");
    }
    res.status(200).json(space);
  } catch (error) {
    next(error);
  }
});

// GET route to fetch similar spaces based on category
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

    res.status(200).json(similarSpaces);
  } catch (error) {
    next(error);
  }
});

// GET route to fetch all spaces f
spaceRouter.get("/", async (req, res, next) => {
  try {
    const spaces = await Spaces.find({}).populate("categoriesId").exec();
    if (spaces.length === 0) {
      throw createError(404, "Not found");
    }
    res.status(200).json(spaces);
  } catch (error) {
    next(createError(500, "Unable to fetch spaces"));
  }
});

export default spaceRouter;
