import express from "express";
import Categories from "../models/categories.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "../helpers/helpers.js";

const categoriesRouter = express.Router();

export default categoriesRouter;
