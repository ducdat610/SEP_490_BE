
import createError from "http-errors";
import Users from "../models/users.js";
import express from "express";
import bcrypt from "bcrypt";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} from "../helpers/jwt_helper.js";
import { userController } from "../controllers/index.js";
import jwt from "jsonwebtoken";

const usersRouter = express.Router();
usersRouter.get("/", userController.getAllUsers);
usersRouter.get("/:username", userController.getUserByUserName);
usersRouter.put("/changepass/:username", userController.changePass);
usersRouter.post("/forgot-password", userController.forgetPass);

usersRouter.post("/reset-password/:id/:token", (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) {
        return res.json({ Status: "Error with token" });
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            Users.findByIdAndUpdate({ _id: id }, { password: hash })
              .then((u) => res.send({ Status: "Success" }))
              .catch((err) => res.send({ Status: err }));
          })
          .catch((err) => res.send({ Status: err }));
      }
    });
  });
  usersRouter.put("/:username", async (req, res, next) => {
    try {
      const { username } = req.params;
      const updatedUserData = req.body; // Dữ liệu người dùng được gửi từ client
  
      const updatedUser = await User.findOneAndUpdate(
        { username: username },
        updatedUserData,
        { new: true } 
      );
  
      if (!updatedUser) {
        throw createError(404, `Người dùng ${username} không tồn tại`);
      }
  
      res.send(updatedUser); // Trả về thông tin người dùng đã được cập nhật
    } catch (error) {
      next(error);
    }
  });


export default usersRouter;
