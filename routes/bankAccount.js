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
bankAccountRouter.post("/", async (req, res) => {
  const { userId, bankId, accountNumber } = req.body;

  try {
    if (!userId || !bankId || !accountNumber) {
      return res
        .status(400)
        .json({ message: "Thiếu trường bắt buộc trong yêu cầu" });
    }

    const newBankAccount = new BankAccount({
      bankId,
      userId,
      accountNumber,
    });

    await newBankAccount.save();

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tìm thấy" });
    }

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
