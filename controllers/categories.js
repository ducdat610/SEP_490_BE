import { categoriesDao } from "../dao/index.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesDao.fetchAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
export default { getAllCategories };
