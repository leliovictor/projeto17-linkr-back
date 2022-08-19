import { Router } from "express";

import { getPosts } from "../controllers/postsController.js"
import { countFollowing } from "../middlewares/timelineMiddleware.js";
import { checkAuthentication } from "../middlewares/token.middleware.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", checkAuthentication, countFollowing, getPosts);

export default timelineRouter;
