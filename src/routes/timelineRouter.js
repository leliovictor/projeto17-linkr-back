import { Router } from "express";
import { getPosts, like, dislike, editPost, teste, insertMessage } from "../controllers/postsController.js"
import { checkAuthentication } from "../middlewares/token.middleware.js";

const timelineRouter = Router();

timelineRouter.get("/timeline", getPosts);
timelineRouter.post("/timeline/:post/like", like);
timelineRouter.post("/timeline/:post/dislike", dislike);
timelineRouter.post("/timeline/:post/edit",checkAuthentication, editPost);
timelineRouter.get("/timeline/teste", teste);
timelineRouter.post("/timeline/:post/comment",checkAuthentication, insertMessage);

export default timelineRouter;

