import { newPostRepository } from "../repositories/newPostRepository.js";

export async function checkPostUser(req, res, next) {
  const { postId } = req.params;
  const { id: tokenUserId } = res.locals.data;

  try {
    const { rows: post } = await newPostRepository.selectPostById(postId);

    //novoMiddleware(findPost)
    if(post.length === 0) return res.status(404).send("Post not found");

    if (post[0].userId !== tokenUserId)
      return res.status(401).send("User not allowed");

    res.locals.postId = postId;
  } catch (err) {
    console.log(`Error middleware: ${err}`);
    return res.sendStatus(500);
  }

  next();
}
