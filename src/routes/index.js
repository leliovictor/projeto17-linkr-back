import { Router } from "express";
import timelineRouter from "./timelineRouter.js";
import hashtagRouter from './hashtagRouter.js'
import authRouter from "./authRouter.js";
import newPostRouter from "./newPostRouter.js";
import hashtagPosts from "./hashtagPostsRouter.js";

const router = Router();


//router.use(//rotas);
router.use(authRouter);
router.use(timelineRouter);
router.use(newPostRouter)
router.use(hashtagRouter)
router.use(hashtagPosts)

export default router;
