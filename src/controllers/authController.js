import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authRepository } from "../repositories/authRepository.js";

export async function postSignUp(_req, res) {
  const { email, password, username, pictureUrl } = res.locals.body;

  const passwordCript = bcrypt.hashSync(password, 10);

  try {
    await authRepository.insertUserAtUsers(
      email,
      passwordCript,
      username,
      pictureUrl
    );
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function postSignIn(_req, res) {
  const { id, email, pictureUrl, username } = res.locals.user;

  const TIME_60M = 60 * 60;
  const secretKey = process.env.JWT_SECRET;
  const data = { id, email };
  const token = jwt.sign(data, secretKey, { expiresIn: TIME_60M });

  const body = {
    id,
    email,
    username,
    pictureUrl,
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };

  return res.status(200).send(body);
}
