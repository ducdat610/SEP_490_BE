import express from "express";
import { cartController } from "../controllers/index.js";

const cartRouter = express.Router()
cartRouter.get('/', cartController.getListSpacesOfUser)
cartRouter.delete('/:id', cartController.deleteSpaces)
export default cartRouter