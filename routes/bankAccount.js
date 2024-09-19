import express from "express";
import BankAccount from "../models/bankAccounts.js";

import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "../helpers/jwt_helper.js";
import Users from "../models/users.js";
const bankAccountRouter = express.Router();
bankAccountRouter.post("/add-bank-account", async (req, res) => {
  const { userId, bankName, accountNumber } = req.body;

  try {
    // Tạo tài khoản ngân hàng mới
    const newBankAccount = new BankAccount({
      bankName,
      accountNumber,
      user: userId, // Liên kết tài khoản ngân hàng với người dùng
    });

    await newBankAccount.save();

    // Cập nhật tài liệu người dùng để thêm tài khoản ngân hàng mới
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tìm thấy" });
    }

    // Thêm ID của tài khoản ngân hàng mới vào mảng bankAccounts
    user.bankAccounts.push(newBankAccount._id);
    await user.save();

    res.status(201).json({
      message: "Tài khoản ngân hàng đã được thêm thành công",
      bankAccount: newBankAccount,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

export default bankAccountRouter;
