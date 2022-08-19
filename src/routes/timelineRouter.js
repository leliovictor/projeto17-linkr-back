import { Router } from "express";
import { getPosts } from "../controllers/postsController.js"

const timelineRouter = Router();

timelineRouter.get("/timeline", getPosts);

export default timelineRouter;

