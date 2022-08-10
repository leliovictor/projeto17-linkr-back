import { Router } from "express"
import newPost from "../controllers/newPostController";
import newPostMiddleware from "../middlewares/newPostValidationMiddleware.js";
import tokenMiddleware from "../middlewares/tokenValidationMiddleware.js";
const router = Router()

router.get('/posts', newPostMiddleware, tokenMiddleware, newPost)

export default router;