import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { checkAuthentication } from "../middlewares/token.middleware.js";

import {
  getUserPosts,
  postSearchUser,
} from "../controllers/postsController.js";
import userLike from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.get("/user/:id", getUserPosts);
userRouter.post(
  "/user/search",
  validateSchemaMiddleware(userLike.userLike),
  checkAuthentication,
  postSearchUser
);

export default userRouter;
