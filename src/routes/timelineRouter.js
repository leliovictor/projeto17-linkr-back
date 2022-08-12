import { Router } from "express";
import { getPosts, getTrendingList } from "../controllers/timelineController.js"
import { checkAuthentication } from "../middlewares/token.middleware.js";

const timelineRouter = Router();

timelineRouter.get('/timeline', checkAuthentication, getTrendingList)
timelineRouter.get("/timeline", getPosts);

export default timelineRouter;

