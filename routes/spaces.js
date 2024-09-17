import { spaceController } from "../controllers/index.js";

const spaceRouter = express.Router();
spaceRouter.get("/", spaceController.getAllSpaces);
export default spaceRouter;
