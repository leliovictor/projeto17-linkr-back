import { Router } from "express";

import authRouter from "./authRouter.js";
import newPostRouter from "./newPostRouter.js";
import timelineRouter from "./timelineRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(timelineRouter);
router.use(authRouter);
router.use(newPostRouter);
router.use(userRouter);

export default router;