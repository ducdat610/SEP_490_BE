import CommunityStandards from "../models/communityStandards.js";

const fetchAllCommunityStandards = async () => {
  try {
    const community = await CommunityStandards.find({}).exec();
    return community;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { fetchAllCommunityStandards };
