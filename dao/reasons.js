import Reasons from "../models/reasons.js";

const fetchAllReasons = async () =>{
    try {
        const reason = await Reasons.find({}).exec()
        return reason
    } catch (error) {
        throw new Error(error.toString())
    }
}

export default { fetchAllReasons }