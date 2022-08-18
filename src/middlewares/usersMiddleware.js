import { postsRepository } from "../repositories/postsRepository.js";

export async function deleteOrFollow(_req, res, next) {
  const { id: userId } = res.locals.data;
  const { followId, followStatus } = res.locals.body;

  try {
    if (followStatus) await postsRepository.deleteUserFollow(userId, followId);
    if (!followStatus) await postsRepository.insertUserFollow(userId, followId);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  next();
}
