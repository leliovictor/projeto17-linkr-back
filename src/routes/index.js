import { Router } from "express";

import authRouter from "./authRouter.js";
import newPostRouter from "./newPostRouter.js";
import timelineRouter from "./timelineRouter.js";
import userRouter from "./userRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import hashtagPosts from "./hashtagPostsRouter.js";

const router = Router();

router.use(timelineRouter);
router.use(authRouter);
router.use(newPostRouter);
router.use(userRouter);
router.use(hashtagRouter)
router.use(hashtagPosts)

export default router;
