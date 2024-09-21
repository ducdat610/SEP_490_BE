import Appliance from "../models/appliances.js";

const fetchAllAppliances = async () => {
  try {
    const listAppliances = await Appliance.find({}).exec();
    return listAppliances;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default { fetchAllAppliances };
