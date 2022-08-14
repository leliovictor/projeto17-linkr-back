import { Router } from "express";
import { getPostsByHashtags } from "../controllers/getPostsByHashtagController.js";
import { checkAuthentication } from "../middlewares/token.middleware.js";

const hashtagPosts = Router();

hashtagPosts.get('/hashtag/:hashtag', checkAuthentication, getPostsByHashtags)

export default hashtagPosts;