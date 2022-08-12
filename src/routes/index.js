import { Router } from "express";
import timelineRouter from "./timelineRouter.js";

import authRouter from "./authRouter.js";

const router = Router();


//router.use(//rotas);
router.use(timelineRouter);
router.use(authRouter);

export default router;