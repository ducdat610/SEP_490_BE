import { communityStandardsDao } from "../dao/index.js";

const getAllCommunityStandards = async (req, res) => {
  try {
    const community = await communityStandardsDao.fetchAllCommunityStandards();
    res.status(200).json(community)
  } catch (error) {
    throw new Error(error.message);
  }
};
export default { getAllCommunityStandards };
