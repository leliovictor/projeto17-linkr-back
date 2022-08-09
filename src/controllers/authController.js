import jwt from "jsonwebtoken";

export async function postSignIn(_req, res) {
  const { email } = res.locals.body;

  const TIME_60M = 60 * 60;
  const secretKey = process.env.JWT_SECRET;
  const data = {email};
  const token = jwt.sign(data, secretKey, { expiresIn: TIME_60M });

  return res.status(200).send(token);
}