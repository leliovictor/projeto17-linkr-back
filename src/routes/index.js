import { Router } from "express";
import timelineRouter from "./timelineRouter.js";

const router = Router();

//router.use(//rotas);
router.use(timelineRouter);

export default router;