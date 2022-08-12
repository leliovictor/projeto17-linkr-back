import { Router } from "express";
import { getPostsByHashtags } from "../controllers/getPostsByHashtagController.js";
import { checkAuthentication } from "../middlewares/token.middleware.js";

const hashtag = Router();

hashtag.get('/hashtag/:hashtag', checkAuthentication, getPostsByHashtags)

export default hashtag;