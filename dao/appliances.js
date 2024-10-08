import Appliances from "../models/appliances.js";

const fetchAllAppliances = async () => {
  try {
    const allAppliances = await Appliances.find().exec();
    return allAppliances;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchAllAppliancesCategories = async (cateid) => {
  try {
    const appliances = await Appliances.findOne({categoryId:cateid}).exec();
    return appliances;
  } catch (error) {
    throw new Error(error.message);
  }
};

 const addAppliance = async (applianceData) => {
  try {
    const newAppliance = new Appliances(applianceData);
    await newAppliance.save();
    return newAppliance; // Trả về appliance mới sau khi lưu thành công
  } catch (error) {
    console.error('Error creating new appliance:', error);
    throw new Error('Error creating new appliance in DAO');
  }
};



export default { fetchAllAppliances, fetchAllAppliancesCategories,addAppliance };
