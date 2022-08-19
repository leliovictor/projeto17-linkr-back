import postsRepository from "../repositories/postsRepository.js";
import urlMetadata from "url-metadata";

const getPosts = async (req, res) => {
  let postsData = [];

  try {
    const { rows: result } = await postsRepository.getPosts();

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
    console.log(error)
    return res.status(500).send(error);
  }
};

const getUserPosts = async (req, res) => {
  const userId = req.params.id;
  let userPostsData = [];

  try {
    const { rows: result } = await postsRepository.getUserPosts(userId);

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

    return res.status(200).send(userPostsData);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getHashtagPosts = async (req, res) => {
	const hashtag = req.params.hashtag
    let postsData = [];

    try {
      const { rows: result } = await postsRepository.getPostsByHashtags(hashtag);

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

  try {
    const { rows: usernames } = await postsRepository.selectUserByLikeName(
      username
    );

    return res.status(200).send(usernames);
  } catch (err) {
    return res.sendStatus(500);
  }
};

const editPost = async (req, res) => {
  const editMessage = req.body;
  const postId = req.params.postId;

  try {
    await postsRepository.editMessage(editMessage.message, postId);

    return res.sendStatus(202);
  } catch (error) {
    return res.sendStatus(500);
  };
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

export { getPosts, like, dislike, getUserPosts, postSearchUser, getHashtagPosts, editPost, insertMessage };
