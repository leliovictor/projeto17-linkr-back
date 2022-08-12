import { Router } from "express";
import timelineRouter from "./timelineRouter.js";

import authRouter from "./authRouter.js";
import newPostRouter from "./newPostRouter.js";

const router = Router();


//router.use(//rotas);
router.use(timelineRouter);
router.use(authRouter);
router.use(newPostRouter)

export default router;