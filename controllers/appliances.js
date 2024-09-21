
import { appliancesDao } from "../dao/index.js"

const getAllAppliances = async (req, res) =>{
    try {
        const appliances = await appliancesDao.fetchAllAppliances()
        res.status(200).json(appliances)
    } catch (error) {
        res.status(500).json({message: error.toString()})
    }
}
export default {getAllAppliances}
