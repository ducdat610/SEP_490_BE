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

const addSpacesToCart = async (userId, spaceId, categoriesId, quantity) => {
  try {
    const newSpaceItem = new Carts({ userId, spaceId, categoriesId, quantity });
    await newSpaceItem.save();
  } catch (error) {
    throw new Error(error.toString());
  }
};
const removeListSpaceOfUser = async (spaceId) => {
  try {
    const listSpace = await Carts.deleteMany({ spaceId: spaceId }).exec();
    return listSpace;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default {
  fetchListSpaceOfUser,
  removeListSpaceOfUser,
  addSpacesToCart,
};
