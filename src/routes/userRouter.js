import { Router } from "express";
import { getUserPosts } from "../controllers/postsController.js";

const userRouter = Router();

userRouter.get("/user/:id", getUserPosts);

export default userRouter;