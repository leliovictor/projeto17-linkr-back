import { Router } from "express";

import authRouter from "./authRouter.js";
import newPostRouter from "./newPostRouter.js";

const router = Router();

router.use(authRouter);
router.use(newPostRouter)

export default router;