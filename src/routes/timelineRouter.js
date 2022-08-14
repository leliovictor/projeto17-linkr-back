import { Router } from "express";
import { getPosts, like, dislike } from "../controllers/postsController.js"

const timelineRouter = Router();

timelineRouter.get("/timeline", getPosts);
timelineRouter.post("/timeline/:post/like", like);
timelineRouter.post("/timeline/:post/dislike", dislike);

export default timelineRouter;

