import express from "express";
import createError from "http-errors";
import UserNeeds from "../models/userNeeds.js";
import Users from "../models/users.js";
const userNeedRouter = express.Router();
userNeedRouter.get("/", async (req, res, next) => {
  try {
    const userNeedlist = await UserNeeds.find({}).populate("userId").exec();
    if (userNeedlist.length === 0) {
      throw createError(404, "UserNeeds is Empty");
    }
    res.status(200).json(userNeedlist);
  } catch (error) {
    next(error);
  }
});
//Cập nhật nhu cầu của người dùng
userNeedRouter.post("/:userId/needs", async (req, res) => {
  const { userId } = req.params;
  const { productPreferences, goals } = req.body;

  try {
    const userNeeds = new UserNeeds({ productPreferences, goals, userId });
    await userNeeds.save();

    await Users.findByIdAndUpdate(userId, {
      needs: userNeeds._id,
      firstLogin: false,
    });

    res
      .status(200)
      .json({ message: "User needs updated and referenced successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user needs" });
  }
});

export default userNeedRouter;
