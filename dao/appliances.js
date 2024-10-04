import Appliances from "../models/appliances.js";

const fetchAllAppliancesDefault = async () => {
  try {
    const appliancesDefault = await Appliances.find({isCustom: false}).exec();
    return appliancesDefault;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchAllAppliances = async () => {
  try {
    const allAppliances = await Appliances.find().exec();
    return allAppliances;
  } catch (error) {
    throw new Error(error.message);
  }
};  



// Thêm tiện ích tùy chỉnh vào data
export const addCustomAppliance = async (applianceData) => {
  try {
    const newAppliance = new Appliances(applianceData);
    await newAppliance.save();
    return newAppliance;
  } catch (error) {
    throw new Error("Error adding custom appliance");
  }
};

export default { fetchAllAppliancesDefault, addCustomAppliance,fetchAllAppliances };
