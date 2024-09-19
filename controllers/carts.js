import { cartDao } from "../dao/index.js";

const getListSpacesOfUser = async (req, res) => {
  try {
    const listSpacesByUser = req.params.id;
    const listSpaces = await cartDao.fetchListSpaceOfUser(listSpacesByUser);
    if (listSpaces) {
      res.status(200).json(listSpaces);
    } else {
      res.status(404).json({ message: "Not found spaces" });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
const deleteSpaces = async (req, res) => {
  try {
    const listSpaces = await cartDao.removeListSpaceOfUser(req.params.id);
    if (listSpaces) {
      res.status(200).json(listSpaces);
    } else {
      res.status(404).json({ message: "Not found spaces" });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};
export default { getListSpacesOfUser, deleteSpaces };