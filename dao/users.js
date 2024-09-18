import Users from "../models/users.js";

const fetchAllUsers = async() =>{
  try {
    return await Users.find({}).exec()
  } catch (error) {
    throw new Error(error.toString());
  }
}
const fetchUserByUsername = async (username) =>{
  try {
    return await Users.findOne({username: username}).exec()
  } catch (error) {
    throw new Error(error.toString());
  }
}
const forgotPass = async (gmail) => {
    try {
      return await Users.findOne({ gmail: gmail }).exec();
    } catch (error) {
      throw new Error(error.toString());
    }
  };

const updateUserProfile = async (username, userData) => {
  try {
    return await User.findOneAndUpdate(
      { username: username },
      userData,
      { new: true }
    );
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {fetchAllUsers,forgotPass, fetchUserByUsername, updateUserProfile};
