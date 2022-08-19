import connection from "../config/db.js";

async function getPosts(id) {
  const query = `
  SELECT  
  users.username, users."pictureUrl", posts.url, posts.message, posts."userId", posts.likes, 
  posts.id AS "postId"
  FROM users 
  JOIN posts ON posts."userId" = users.id
  LEFT JOIN followers ON (followers.requested = posts."userId")
  WHERE followers.request = $1 OR posts."userId" = $1
  GROUP BY users.username, users."pictureUrl", posts.id, followers.requested
  ORDER BY posts.id DESC
  LIMIT 20
  `;

  const value = [id];

  return connection.query(query, value);
}

async function getUserPosts(userId) {
  return connection.query(
    `
    SELECT  users.username, users."pictureUrl", posts.url, posts.message, posts."userId", posts.likes, posts.id AS "postId"
    FROM users 
    JOIN posts ON posts."userId" = users.id
    WHERE users.id = $1
    ORDER BY posts.id DESC
    LIMIT 20`,
    [userId]
  );
}

async function getPostsByHashtags(hashtag){
    const query = `SELECT u.id AS "userId", u.username AS username, u."pictureUrl", p.url, p.message, p.likes, p.id AS "postId"
    FROM users u
    JOIN posts p
    ON p."userId" = u.id
    JOIN "hashtagsPosts" hp
    ON hp."postId" = p.id
    JOIN hashtags h
    ON hp."hashtagId" = h.id
    WHERE p.message ILIKE $1`

    const value = [`%#${hashtag}%`]

    return connection.query(query,value)
}

async function post (id) {
    return connection.query(`
    SELECT * FROM posts WHERE id = $1`, [id])
};

async function like(likes, id) {
  return connection.query(
    `
        UPDATE posts 
        SET likes = $1
        WHERE id = $2`,
    [likes + 1, id]
  );
}

async function dislike(likes, id) {
  return connection.query(
    `
        UPDATE posts 
        SET likes = $1
        WHERE id = $2`,
    [likes - 1, id]
  );
}

async function insertLiker(userId, postId) {
  return connection.query(
    `
    INSERT INTO "postsUsers-likes" ("userId", "postId")
    VALUES ($1, $2)`,
    [userId, postId]
  );
}

async function deleteLiker(userId, postId) {
  return connection.query(
    `
    DELETE FROM "postsUsers-likes" WHERE "userId" = $1 AND "postId" = $2`,
    [userId, postId]
  );
}

async function usersWhoLikedThePost(postId) {
  return connection.query(
    `
    SELECT users.username
    FROM users
    JOIN "postsUsers-likes" ON "postsUsers-likes"."userId" = users.id
    WHERE "postsUsers-likes"."postId" = $1`,
    [postId]
  );
}

async function selectUserByLikeName(name, id) {
  const query = `
  SELECT u.id, u.username, u."pictureUrl", f.request AS following
  FROM users u 
  LEFT JOIN followers f ON u.id = f.requested
  WHERE username LIKE $1
  ORDER BY CASE WHEN f.request = $2 THEN 0 ELSE 1 END, u.username ASC
    `;

  const value = [`${name}%`, id];

  return connection.query(query, value);
}

async function selectUserFollow(userId, followId) {
  const query = `
  SELECT * FROM followers
  WHERE request=$1 AND requested=$2
  `;

  const values = [userId, followId];

  return connection.query(query, values);
}

async function deleteUserFollow(userId, followId) {
  const query =`
  DELETE FROM followers WHERE request=$1 AND requested=$2
  `;

  const values = [userId, followId];

  return connection.query(query, values);
}

async function insertUserFollow(userId, followId) {
  const query = `
  INSERT INTO followers (request, requested) VALUES ($1, $2)
  `;

  const values = [userId, followId];

  return connection.query(query, values);
}

async function editMessage(message, postId) {
  return connection.query(
    `
    UPDATE posts
    SET message = $1
    WHERE id = $2`,
    [message, postId]
  );
}

async function insertMessage (postId, userId, text) {
  return connection.query(`
  INSERT INTO comments ("postId", "userId", "text")
  VALUES ($1, $2, $3)`,
  [postId, userId, text]);
};

async function usersWhoCommentedThePost (postId) {
  return connection.query(`
  SELECT users.id AS "userId", users.username, users."pictureUrl", comments.text
  FROM comments
  JOIN users ON users.id = comments."userId"
  WHERE comments."postId" = $1`,
  [postId])
};

export const postsRepository = {
  getPosts,
  getUserPosts,
  getPostsByHashtags,
  post,
  like,
  dislike,
  insertLiker,
  deleteLiker,
  usersWhoLikedThePost,
  selectUserByLikeName,
  editMessage,
  insertMessage,
  usersWhoCommentedThePost,
  selectUserFollow,
  deleteUserFollow,
  insertUserFollow,
};
