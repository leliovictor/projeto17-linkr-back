import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { checkAuthentication } from "../middlewares/token.middleware.js";

import { deleteOrFollow } from "../middlewares/usersMiddleware.js";

import {
  getUserPosts,
  postSearchUser,
  checkFollow,
  postFollow
} from "../controllers/postsController.js";
import * as schema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.get("/user/:id", checkAuthentication, getUserPosts);
userRouter.post(
  "/user/search",
  validateSchemaMiddleware(schema.userLike),
  checkAuthentication,
  postSearchUser
);

userRouter.get("/user/follow/:followId", checkAuthentication, checkFollow);
userRouter.post(
  "/user/follow",
  validateSchemaMiddleware(schema.userFollow),
  checkAuthentication,
  deleteOrFollow,
  postFollow
);

export default userRouter;
