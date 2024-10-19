import express from "express";
import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "../helpers/jwt_helper.js";
import Rules from "../models/rules.js";
import createError from "http-errors";

const rulesRouter = express.Router();

rulesRouter.get("/", async (req, res, next) => {
  try {
    const rules = await Rules.find({}).exec();
    if (rules.length === 0) throw createError(404, "Not Found");
    res.json(rules);
  } catch (error) {
    next(error);
  }
});
rulesRouter.post("/", async (req, res, next) => {
  try {
    const { text, description } = req.body;

    // Check if a rule with the same text already exists
    const textRules = await Rules.findOne({ text }).exec();
    if (textRules) {
      return res.sendStatus(400); //  rule with this text already exists
    }

    const newRule = new Rules({ text, description });
    await newRule.save();

    res.status(201).json(newRule);
  } catch (error) {
    next(error);
  }
});
rulesRouter.post("/addRule", async (req, res, next) => {
  try {
    const { name, selectedRules, customRule } = req.body;

    // Tạo rule mới hoặc cập nhật rule luôn mà không cần kiểm tra
    const ruleSet = new Rules({
      name,
      rules: selectedRules, // Thêm các rules đã chọn
      customeRules: customRule ? [customRule] : [], // Nếu có customRule, thêm vào mảng
    });

    await ruleSet.save(); // Lưu vào database
    res.status(201).json(ruleSet); // Trả về rule mới tạo
  } catch (error) {
    next(error);
  }
});



export default rulesRouter;
