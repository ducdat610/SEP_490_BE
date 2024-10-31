import express from "express";
import BankAccount from "../models/bankAccounts.js";
import Users from "../models/users.js";

const bankAccountRouter = express.Router();

// Existing route to get all bank accounts
bankAccountRouter.get("/", async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find({})
      .populate("bank")
      .populate("user")
      .exec();

    res.status(200).json(bankAccounts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// New route to get bank accounts by user ID
bankAccountRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params; // Get user ID from request parameters

  try {
    // Find bank accounts associated with the user
    const bankAccounts = await BankAccount.find({ user: userId })
      .populate("bank")
      .populate("user")
      .exec();

    if (!bankAccounts.length) {
      return res.status(404).json({
        message: "Không tìm thấy tài khoản ngân hàng cho người dùng này",
      });
    }

    res.status(200).json(bankAccounts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// Existing route to create a new bank account
bankAccountRouter.post("/", async (req, res) => {
  const { user, bank, accountNumber } = req.body;

  try {
    if (!user || !bank || !accountNumber) {
      return res
        .status(400)
        .json({ message: "Thiếu trường bắt buộc trong yêu cầu" });
    }

    const bankAccountExist = await BankAccount.findOne({
      bank,
      accountNumber,
    }).exec();

    if (bankAccountExist) {
      return res
        .status(400)
        .json({ message: "Tài khoản ngân hàng đã tồn tại" });
    }

    const newBankAccount = new BankAccount({
      bank,
      user,
      accountNumber,
    });

    await newBankAccount.save();

    const foundUser = await Users.findById(user);
    if (!foundUser) {
      return res.status(404).json({ message: "Người dùng không tìm thấy" });
    }

    foundUser.bankAccounts.push(newBankAccount._id);
    await foundUser.save();

    res.status(201).json({
      message: "Tài khoản ngân hàng đã được thêm thành công",
      bankAccount: newBankAccount,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// New route to update an existing bank account
bankAccountRouter.put("/:accountId", async (req, res) => {
  const { accountId } = req.params; // Get account ID from request parameters
  const { bank, accountNumber } = req.body; // Get data to update

  try {
    // Find the bank account by ID
    const bankAccount = await BankAccount.findById(accountId);

    if (!bankAccount) {
      return res
        .status(404)
        .json({ message: "Tài khoản ngân hàng không tìm thấy" });
    }

    // Update fields if provided
    if (bank) {
      bankAccount.bank = bank;
    }
    if (accountNumber) {
      bankAccount.accountNumber = accountNumber;
    }

    await bankAccount.save(); // Save updated bank account

    res.status(200).json({
      message: "Tài khoản ngân hàng đã được cập nhật thành công",
      bankAccount,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});
// New route to delete a bank account
bankAccountRouter.delete("/:accountId", async (req, res) => {
  const { accountId } = req.params; // Get account ID from request parameters

  try {
    // Find and delete the bank account by ID
    const bankAccount = await BankAccount.findByIdAndDelete(accountId);

    if (!bankAccount) {
      return res
        .status(404)
        .json({ message: "Tài khoản ngân hàng không tìm thấy" });
    }

    // Optionally, you might want to remove the account ID from the user's bankAccounts array
    const user = await Users.findById(bankAccount.user);
    if (user) {
      user.bankAccounts.pull(accountId); // Remove accountId from the user's bankAccounts array
      await user.save();
    }

    res.status(200).json({
      message: "Tài khoản ngân hàng đã được xóa thành công",
      bankAccount,
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
});

export default bankAccountRouter;
