import { Router } from "express";
import { getTrendingList } from "../controllers/timelineController.js"
import { checkAuthentication } from "../middlewares/token.middleware.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtags', checkAuthentication, getTrendingList)

export default hashtagRouter;