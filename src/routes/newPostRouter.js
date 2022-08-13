import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { checkAuthentication } from "../middlewares/token.middleware.js";
import { newPost, deletePost } from "../controllers/newPostController.js";
import newPostSchema from "../schemas/postSchemas.js";
import { checkPostUser } from "../middlewares/newPostMiddleware.js";

const newPostRouter = Router();
newPostRouter.post(
  "/posts",
  validateSchemaMiddleware(newPostSchema.newPostSchema),
  checkAuthentication,
  newPost
);
newPostRouter.delete("/posts/:postId", checkAuthentication, checkPostUser, deletePost);

export default newPostRouter;
