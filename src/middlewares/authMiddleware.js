import bcrypt from "bcrypt";

import { authRepository } from "../repositories/authRepository.js";

export async function checkEmailDuplicate(_req, res, next) {
  const { email } = res.locals.body;

  try {
    const checkDuplicate = await authRepository.selectUserByEmail(email);
    if (checkDuplicate.rowCount !== 0)
      return res.status(409).send("Email already in use");
  } catch (err) {
    return res.sendStatus(500);
  }
  next();
}

export async function checkUsernameDuplicate(_req, res, next) {
  const { username } = res.locals.body;

  try {
    const checkDuplicate = await authRepository.selectUserByUsername(username);
    if (checkDuplicate.rowCount !== 0)
      return res.status(409).send("Username already in use");
  } catch (err) {
    return res.sendStatus(500);
  }

  next();
}

export async function checkEmail(_req, res, next) {
  const { email } = res.locals.body;

  try {
    const user = await authRepository.selectUserByEmail(email);
    if (user.rowCount !== 1)
      return res.status(401).send("E-mail or Password incorrect!");

    res.locals.user = user.rows[0];
  } catch (err) {
    return res.sendStatus(500);
  }
  next();
}

export async function checkPassword(_req, res, next) {
  const { password } = res.locals.body;
  const { password:passwordCript } = res.locals.user;

  const confirmPassword = bcrypt.compareSync(password, passwordCript);

  if (!confirmPassword)
    return res.status(401).send("E-mail or Password incorrect!");

  next();
}
