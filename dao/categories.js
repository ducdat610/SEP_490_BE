import Categories from "../models/categories.js";

const fetchAllCategories = async () => {
  try {
    const listCategories = await Categories.find({}).exec();
    return listCategories;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default { fetchAllCategories };
