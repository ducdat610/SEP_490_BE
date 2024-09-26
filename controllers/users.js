import bcrypt from "bcrypt";
import Users from "../models/users.js";
import { userDao } from "../dao/index.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const getAllUsers = async (req, res) =>{
  try {
    const allUsers = await userDao.fetchAllUsers();
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(500).json({error:error.toString()})
  }
}
//use
const getUserByUserName = async (req, res) =>{
  try {
    const username = await userDao.fetchUserByUsername(req.params.username)
    res.status(200).json(username)
  } catch (error) {
    res.status(500).json({error:error.toString()})
  }
}

const changePass = async (req, res) => {
  try {
    const { username } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!username || !oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }

    const user = await Users.findOne({ username });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res
      .status(500)
      .json({ status: false, message: "Server error", error: error.message });
  }
};

const forgetPass = async (req, res) => {
    const { gmail } = req.body;
    try {
      const user = await userDao.forgotPass(gmail);
      if (!user) {
        return res.send({ Status: "User not found" });
      }
      const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
        expiresIn: "1d",
      });
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "thang2k210@gmail.com",
          pass: "bqvh osxx crfn giai",
        },
      });
  
      var mailOptions = {
        from: "thang2k210@gmail.com",
        to: gmail,
        subject: "Đặt lại mật khẩu",
        html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2 style="color: #4CAF50;">Đặt lại mật khẩu</h2>
          <p>Xin chào <b>${user.fullname}</b> !!!</p>
          <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn. Nhấp vào nút bên dưới để đặt lại mật khẩu của bạn:</p>
          <a href="http://localhost:3000/reset-password/${user._id}/${token}" 
             style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
            Đặt lại mật khẩu
          </a>
          <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
          <p>Cảm ơn !!!</p>
          <img src="https://res.cloudinary.com/degpdpheb/image/upload/v1726589174/logo_bdn2vl.png"></img>
        </div>
      `,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.send({ Status: "Error sending email" });
        } else {
          return res.send({ Status: "Success" });
        }
      });
    } catch (error) {
      console.error(error);
      return res.send({ Status: "Error", Error: error.message });
    }
  };

export default {
  getAllUsers,
  changePass,
  forgetPass,
  getUserByUserName
};
