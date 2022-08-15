import { newPostRepository } from "../repositories/newPostRepository.js";

export async function newPost(_req, res) {
  const newPost = res.locals.body;
  const data = res.locals.data;

  function findHashtags(str) {
    const hashtags = str.match(/#\w+/g);
    if (hashtags) {
      return hashtags.map((hashtag) => hashtag.slice(1));
    }
    return [];
  }

  try {
    await newPostRepository.addNewPost(newPost.url, newPost.message, data.id);
    if (newPost.message) {
      const hashtags = findHashtags(newPost.message);
      if (hashtags.length > 0) {
        for (let i = 0; i < hashtags.length; i++) {
          const registeredHashtags = await newPostRepository.getHashtagsByName(
            hashtags[i]
          );
          if (!registeredHashtags.rows[0]) {
            await newPostRepository.addNewHashtag(hashtags[i]);
          }
          const postId = await newPostRepository.getPosts(
            newPost.message,
            data.id
          );
          const hashtagId = await newPostRepository.getHashtagsByName(
            hashtags[i]
          );
          await newPostRepository.addNewHashtagPost(
            hashtagId.rows[0].id,
            postId.rows[0].id
          );
        }
      }
    }
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function deletePost(_req, res) {
  const { postId } = res.locals.postId;

  try {
    await newPostRepository.deletePostFromHashtagsPosts(postId);
    await newPostRepository.deletePostById(postId);
    return res.status(202).send("Post deleted");
  } catch (err) {
    console.log(`Error controller: ${err}`);
    return res.sendStatus(500);
  }
}
