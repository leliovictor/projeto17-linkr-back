import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authRepository } from "../repositories/authRepository.js";

export async function postSignUp(_req, res) {
  const { email, password, username, pictureUrl } = res.locals.body;

  const passwordCript = bcrypt.hashSync(password, 10);

  try {
    await authRepository.insertUserAtUsers(email, passwordCript, username, pictureUrl);
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function postSignIn(_req, res) {
  const { email } = res.locals.body;

  const TIME_60M = 60 * 60;
  const secretKey = process.env.JWT_SECRET;
  const data = {email};
  const token = jwt.sign(data, secretKey, { expiresIn: TIME_60M });

  return res.status(200).send(token);
}