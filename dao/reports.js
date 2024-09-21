import Reports from "../models/reports.js";

const createReports = async (reasonId, userId, spaceId) => {
  try {
    const createReport = await Reports.create({
      reasonId,
      userId,
      spaceId,
    });
    return createReport;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default { createReports };
