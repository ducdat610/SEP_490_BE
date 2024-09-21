import Reasons from "../models/reasons.js";

const fetchReportBySId = async (spaceId) => {
  try {
    const report = await Reasons.findById({ spaceId: spaceId }).exec();
    return report;
  } catch (error) {
    throw new Error({ message: error.toString() });
  }
};
export default { fetchReportBySId };
