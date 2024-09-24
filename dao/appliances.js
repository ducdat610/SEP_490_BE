import Appliances from "../models/appliances.js";

const fetchAllAppliances = async () => {
  try {
    const allAppliances = await Appliances.find({isCustom: false}).exec();
    return allAppliances;
  } catch (error) {
    throw new Error(error.message);
  }
};



// Thêm tiện ích tùy chỉnh vào database
export const addCustomAppliance = async (applianceData) => {
  try {
    const newAppliance = new Appliances(applianceData);
    await newAppliance.save();
    return newAppliance;
  } catch (error) {
    throw new Error("Error adding custom appliance");
  }
};

export default { fetchAllAppliances, addCustomAppliance };
