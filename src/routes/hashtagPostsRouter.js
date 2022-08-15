import { Router } from "express";
import { getHashtagPosts } from "../controllers/postsController.js";
import { checkAuthentication } from "../middlewares/token.middleware.js";

const hashtagPosts = Router();

hashtagPosts.get('/hashtag/:hashtag', checkAuthentication, getHashtagPosts)

export default hashtagPosts;