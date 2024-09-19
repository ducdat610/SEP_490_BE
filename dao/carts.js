import Carts from "../models/carts.js";

const fetchListSpaceOfUser = async (id) => {
  try {
    const listSpaces = await Carts.find({ userId: id })
      .populate("userId")
      .populate("spaceId")
      .populate("categoriesId");
    return listSpaces;
  } catch (error) {}
};
const removeListSpaceOfUser = async (spaceId) => {
  try {
    const listSpace = await Carts.deleteMany({ spaceId: spaceId }).exec();
    return listSpace;
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default { fetchListSpaceOfUser, removeListSpaceOfUser };
