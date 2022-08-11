import jwt from "jsonwebtoken";

export async function checkAuthentication(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Miss token from headers");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.data = data;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }

  next();
}
