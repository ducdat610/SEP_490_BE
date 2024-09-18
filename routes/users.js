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
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, fullname, gmail } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!username || !password || !fullname || !gmail) {
      throw createError.BadRequest(
        "Yêu cầu nhập đầy đủ tên người dùng, mật khẩu và gmail"
      );
    }

    // Kiểm tra xem username đã tồn tại chưa
    const existingUserByUsername = await Users.findOne({ username }).exec();
    if (existingUserByUsername)
      throw createError.Conflict("Tên người dùng đã tồn tại");

    // Kiểm tra xem gmail đã tồn tại chưa
    const existingUserByGmail = await Users.findOne({ gmail }).exec();
    if (existingUserByGmail)
      throw createError.Conflict("Gmail đã được đăng ký");

    // Mã hóa mật khẩu
    const hashPass = await bcrypt.hash(
      password,
      parseInt(process.env.PASSWORD_SECRET)
    );

    // Tạo người dùng mới với thông tin được cung cấp
    const newUser = new Users({
      fullname,
      username,
      gmail,
      password: hashPass,
    });

    // Lưu người dùng mới vào cơ sở dữ liệu
    const savedUser = await newUser.save();

    // Tạo access token sau khi đăng ký thành công
    const accessToken = await signAccessToken(savedUser._id);

    // Gửi phản hồi cho client
    res.send({ accessToken, newUser });
  } catch (error) {
    next(error);
  }
});
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Tìm người dùng bằng username hoặc gmail đã đăng kí
    const user = await Users.findOne({
      $or: [{ username: username }, { gmail: username }],
    }).exec();

    if (!user) throw createError.NotFound("User not registered");

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw createError.Unauthorized(
        "Username, Gmail, or password is incorrect"
      );

    // Tạo access token và refresh token
    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);

    // Trả về phản hồi
    res.status(200).json({
      username: user.username,
      accessToken,
      refreshToken,
      id: user._id,
      fullname: user.fullname,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
});
usersRouter.delete("/logout", async (req, res, next) => {
  res.send("Đường dẫn Đăng xuất");
});
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
export default usersRouter;
