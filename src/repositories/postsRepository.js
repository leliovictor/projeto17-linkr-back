import connection from "../config/db.js";

async function getPosts() {
  return connection.query(`
    SELECT  users.username, users."pictureUrl", posts.url, posts.message, posts."userId", posts.likes, posts.id AS "postId"
    FROM users 
    JOIN posts ON posts."userId" = users.id
    ORDER BY posts.id DESC
    LIMIT 20`);
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

async function selectUserByLikeName(name) {
  const query = `
    SELECT id, username, "pictureUrl" 
    FROM users 
    WHERE username LIKE $1
    ORDER BY username ASC
    `;

  const value = [`${name}%`];

  return connection.query(query, value);
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

const postsRepository = {
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
  editMessage
};

export default postsRepository;
