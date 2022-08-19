import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { checkAuthentication } from "../middlewares/token.middleware.js";
import { newPost } from "../controllers/newPostController.js";
import newPostSchema from "../schemas/postSchemas.js";


const newPostRouter = Router();
newPostRouter.post(
  "/posts",
  validateSchemaMiddleware(newPostSchema.newPostSchema),
  checkAuthentication,
  newPost
);


export default newPostRouter;
