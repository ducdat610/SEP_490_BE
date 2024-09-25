import Appliances from "../models/appliances.js";
const fetchAllAppliances = async () => {
  try {
    const allAppliances = await Appliances.find({}).exec();
    return allAppliances;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default { fetchAllAppliances };
