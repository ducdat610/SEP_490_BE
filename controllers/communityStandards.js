import { communityStandardsDao } from "../dao/index.js";

const getAllCommunityStandards = async (req, res) => {
  try {
    const community = await communityStandardsDao.fetchAllCommunityStandards();
    res.status(200).json(community)
  } catch (error) {
    throw new Error(error.message);
  }
};
const addCommunityStandard = async (req, res) => {
  try {
    const newStandard = await communityStandardsDao.addCommunityStandard(req.body);
    res.status(201).json(newStandard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default { getAllCommunityStandards, addCommunityStandard };
