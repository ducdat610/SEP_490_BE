import Reports from "../models/reports.js";
import Spaces from "../models/spaces.js";

const createReports = async (reasonId, userId, spaceId) => {
  try {
    const createReport = await Reports.create({
      reasonId,
      userId,
      spaceId,
    });
    await Spaces.findByIdAndUpdate(
      spaceId,
      { $inc: { reportCount: 1 } },  
      { new: true }  
    );
    return createReport;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default { createReports };
