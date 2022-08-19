import { postsRepository } from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

const getPosts = async (_req, res) => {
  let postsData = [];
  const { id } = res.locals.data;
  const { followCount } = res.locals;
  const page = _req.query.page;
  const limit = 10;
  const end = (page-1) * limit;
  console.log("pageBack: ", page, "end: ", end)

  try {
    const { rows: result } = await postsRepository.getPosts(id, end);

    function savePostsData(post, metadata, resultUsersWhoLikedThePost, resultUsersWhoCommentedThePost) {
			const { title, image, description } = metadata;
			postsData.push({
        ...post, 
        urlInfo: { title, image, description },
        usersWhoLiked: resultUsersWhoLikedThePost,
        usersWhoCommented: resultUsersWhoCommentedThePost
      });
		};

		const arrayMap = result.map((post) =>
			urlMetadata(`${post.url}`)
        .then( async (metadata) => {
          const { rows: resultUsersWhoLikedThePost } = await postsRepository.usersWhoLikedThePost(post.postId);
          const { rows: resultUsersWhoCommentedThePost } = await postsRepository.usersWhoCommentedThePost(post.postId);
          savePostsData(post, metadata, resultUsersWhoLikedThePost, resultUsersWhoCommentedThePost);
        })
        .catch((error) => console.log(error))
		);

		await Promise.all(arrayMap);

    postsData.sort((a, b) => b.postId - a.postId);

    return res.status(200).send({ posts: postsData, followCount });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getUserPosts = async (req, res) => {
  const userId = req.params.id;
  let postsData = [];
  const followStatus = res.locals.follow;
  const page = req.query.page;
  const limit = 10;
  const end = (page-1) * limit;

  try {
    const { rows: result } = await postsRepository.getUserPosts(userId, end);

    function savePostsData(post, metadata, resultUsersWhoLikedThePost, resultUsersWhoCommentedThePost) {
			const { title, image, description } = metadata;
			postsData.push({
        ...post, 
        urlInfo: { title, image, description },
        usersWhoLiked: resultUsersWhoLikedThePost,
        usersWhoCommented: resultUsersWhoCommentedThePost
      });
		};

		const arrayMap = result.map((post) =>
			urlMetadata(`${post.url}`)
        .then( async (metadata) => {
          const { rows: resultUsersWhoLikedThePost } = await postsRepository.usersWhoLikedThePost(post.postId);
          const { rows: resultUsersWhoCommentedThePost } = await postsRepository.usersWhoCommentedThePost(post.postId);
          savePostsData(post, metadata, resultUsersWhoLikedThePost, resultUsersWhoCommentedThePost);
        })
        .catch((error) => console.log(error))
		);

		await Promise.all(arrayMap);

    postsData.sort((a, b) => b.postId - a.postId);

    return res.status(200).send(postsData);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getHashtagPosts = async (req, res) => {
	  const hashtag = req.params.hashtag
    let postsData = [];
    const page = req.query.page;
    const limit = 10;
    const end = (page-1) * limit;

    try {
      const { rows: result } = await postsRepository.getPostsByHashtags(hashtag, end);
      console.log("result hash: ", result)

      function savePostsData(post, metadata, resultUsersWhoLikedThePost, resultUsersWhoCommentedThePost) {
        const { title, image, description } = metadata;
        postsData.push({
          ...post, 
          urlInfo: { title, image, description },
          usersWhoLiked: resultUsersWhoLikedThePost,
          usersWhoCommented: resultUsersWhoCommentedThePost
        });
      };
  
      const arrayMap = result.map((post) =>
        urlMetadata(`${post.url}`)
          .then( async (metadata) => {
            const { rows: resultUsersWhoLikedThePost } = await postsRepository.usersWhoLikedThePost(post.postId);
            const { rows: resultUsersWhoCommentedThePost } = await postsRepository.usersWhoCommentedThePost(post.postId);
            savePostsData(post, metadata, resultUsersWhoLikedThePost, resultUsersWhoCommentedThePost);
          })
          .catch((error) => console.log(error))
      );
  
      await Promise.all(arrayMap);
  
      postsData.sort((a, b) => b.postId - a.postId);
      //console.log("vezes que entrou: ", postsData)
      return res.status(200).send(postsData);
    } catch (error) {
      return res.status(500).send(error);
    };

};

const like = async (req, res) => {
  const postId = req.params.postId;
  const { userId } = req.body;

  try {
    const { rows: post } = await postsRepository.post(postId);
    await postsRepository.like(post[0].likes, postId);
    await postsRepository.insertLiker(userId, postId);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const dislike = async (req, res) => {
  const postId = req.params.postId;
  const { userId } = req.body;

  try {
    const { rows: post } = await postsRepository.post(postId);
    await postsRepository.dislike(post[0].likes, postId);
    await postsRepository.deleteLiker(userId, postId);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const postSearchUser = async (_req, res) => {
  const { username } = res.locals.body;
  const { id } = res.locals.data;

  try {
    const { rows: usernames } = await postsRepository.selectUserByLikeName(
      username,
      id
    );

    return res.status(200).send(usernames);
  } catch (err) {
    return res.sendStatus(500);
  }
};

const checkFollow = async (req, res) => {
  const { id: userId } = res.locals.data;
  const { followId } = req.params;

  try {
    const { rowCount: following } = await postsRepository.selectUserFollow(
      userId,
      followId
    );

    return following ? res.status(200).send(true) : res.status(200).send(false);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

const postFollow = async (_req, res) => {
  return res.sendStatus(200);
};

const editPost = async (req, res) => {
  const editMessage = req.body;
  const postId = req.params.postId;

  try {
    await postsRepository.editMessage(editMessage.message, postId);

    return res.sendStatus(202);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const insertMessage = async (req, res) => {
  const postId = req.params.postId;
  const message = req.body;

  try {
    await postsRepository.insertMessage(postId, message.ownerOfThePost, message.comment);

    return res.sendStatus(202);
  } catch (error) {
    return res.sendStatus(500);
  };
};

export { 
  getPosts, 
  like, 
  dislike, 
  getUserPosts, 
  postSearchUser, 
  getHashtagPosts, 
  editPost,
  checkFollow,
  postFollow,
  insertMessage 
 };

