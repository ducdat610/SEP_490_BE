import express from "express";
import BankAccount from "../models/bankAccounts.js";

import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "../helpers/jwt_helper.js";
import Users from "../models/users.js";
import Bank from "../models/bank.js";
const bankAccountRouter = express.Router();
bankAccountRouter.get("/", async (req, res) => {
  try {
    // Lấy tất cả tài khoản ngân hàng
    const bankAccounts = await BankAccount.find({})
      .populate("bank")
      .populate("user")
      .exec();

    res.status(200).json({
      message: "Danh sách tài khoản ngân hàng đã được lấy thành công",
      bankAccounts,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});
bankAccountRouter.post("/", async (req, res) => {
  const { user, bank, accountNumber } = req.body;

  try {
    // Kiểm tra các trường bắt buộc
    if (!user || !bank || !accountNumber) {
      return res
        .status(400)
        .json({ message: "Thiếu trường bắt buộc trong yêu cầu" });
    }

    // Kiểm tra xem tài khoản ngân hàng đã tồn tại chưa
    const bankAccountExist = await BankAccount.findOne({
      bank,
      accountNumber,
    }).exec();
    fs;
    if (bankAccountExist) {
      return res
        .status(400)
        .json({ message: "Tài khoản ngân hàng đã tồn tại" });
    }

    // Tạo tài khoản ngân hàng mới
    const newBankAccount = new BankAccount({
      bank,
      user,
      accountNumber,
    });

    await newBankAccount.save();

    // Cập nhật người dùng với tài khoản ngân hàng mới
    const foundUser = await Users.findById(user);
    if (!foundUser) {
      return res.status(404).json({ message: "Người dùng không tìm thấy" });
    }

    foundUser.bankAccounts.push(newBankAccount._id);
    await foundUser.save();

    // Phản hồi thành công
    res.status(201).json({
      message: "Tài khoản ngân hàng đã được thêm thành công",
      bankAccount: newBankAccount,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

export default bankAccountRouter;
