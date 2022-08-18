import { timelineRepository } from "../repositories/timelineRepository.js";

export async function countFollowing(_req, res, next) {
  const { id } = res.locals.data;

  try {
    const countArr = await timelineRepository.countUserFollowing(id);
    countArr.rowCount ? res.locals.followCount = countArr.rows[0].count : res.locals.followCount = 0;
  } catch (err) {
    return res.sendStatus(500);
  }
  next();
}
