import { Router } from "express";
import timelineRouter from "./timelineRouter.js";
import hashtagRouter from './hashtagRouter.js'
import authRouter from "./authRouter.js";
import newPostRouter from "./newPostRouter.js";

const router = Router();


//router.use(//rotas);
router.use(authRouter);
router.use(timelineRouter);
router.use(newPostRouter)
router.use(hashtagRouter)

export default router;