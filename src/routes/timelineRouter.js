import { Router } from "express";
import { getPosts, like, dislike } from "../controllers/postsController.js"
import {checkAuthentication} from "../middlewares/token.middleware.js";

import {countFollowing} from "../middlewares/timelineMiddleware.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", checkAuthentication, countFollowing, getPosts);
timelineRouter.post("/timeline/:post/like", like);
timelineRouter.post("/timeline/:post/dislike", dislike);

export default timelineRouter;

