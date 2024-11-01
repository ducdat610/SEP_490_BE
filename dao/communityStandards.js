import CommunityStandards from "../models/communityStandards.js";

const fetchAllCommunityStandards = async () => {
  try {
    const community = await CommunityStandards.find({}).exec();

    const filteredCommunity = community.filter(item => 
      item.reason && (!item.customeCommunityStandards || item.customeCommunityStandards.length === 0)
    );

    return filteredCommunity;
  } catch (error) {
    throw new Error(error.message);
  }
};

const addCommunityStandard = async (standardData) => {
  try {
    const newStandard = new CommunityStandards(standardData);
    await newStandard.save();
    return newStandard;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default { fetchAllCommunityStandards, addCommunityStandard };
