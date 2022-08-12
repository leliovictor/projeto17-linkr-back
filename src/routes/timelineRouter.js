import { Router } from "express";
import { getPosts } from "../controllers/timelineController.js"

const timelineRouter = Router();

timelineRouter.get("/timeline", getPosts);

export default timelineRouter;

