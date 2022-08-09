import { Router } from "express";

import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware.js";

import * as controller from "../controllers/authController.js";
import * as middleware from "../middlewares/authMiddleware.js";
import * as schema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post(
    "/",
    validateSchemaMiddleware(schema.signIn),
    middleware.checkEmail,
    middleware.checkPassword,
    controller.postSignIn
);

export default authRouter;