import { Router } from "express";
import { like, dislike, editPost, insertMessage } from "../controllers/postsController.js"
import { checkAuthentication } from "../middlewares/token.middleware.js";
import { checkPostUser } from "../middlewares/newPostMiddleware.js";
import { deletePost } from "../controllers/newPostController.js";

const postRouter = Router();

postRouter.post("/post/:postId/like", like);
postRouter.post("/post/:postId/dislike", dislike);
postRouter.post("/post/:postId/edit", checkAuthentication, editPost);
postRouter.post("/post/:postId/comment", checkAuthentication, insertMessage);
postRouter.delete("/post/:postId/delete", checkAuthentication, checkPostUser, deletePost);

export default postRouter;