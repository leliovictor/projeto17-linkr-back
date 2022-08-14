import connection from "../config/db.js";

async function getHashtags() {
  const query = `SELECT * FROM hashtags`;

  return connection.query(query);
}

async function getHashtagsByName(hashtag) {
  const query = `SELECT * FROM hashtags WHERE hashtag=$1`;

  const value = [hashtag];

  return connection.query(query, value);
}

async function getPosts(message, userId) {
  const query = `SELECT * FROM posts WHERE (message=$1 AND "userId" = $2) ORDER BY id DESC`;
  const value = [message, userId];

  return connection.query(query, value);
}

async function addNewPost(url, message, userId) {
  const query = `INSERT INTO posts (url, message, "userId") VALUES ($1, $2, $3)`;

  const values = [url, message, userId];

  return connection.query(query, values);
}

async function addNewHashtag(hashtag) {
  const query = `INSERT INTO hashtags (hashtag) VALUES ($1)`;

  const value = [hashtag];

  return connection.query(query, value);
}

async function addNewHashtagPost(hashtagId, postId) {
  const query = `INSERT INTO "hashtagsPosts" ("hashtagId", "postId") VALUES ($1, $2)`;

  const values = [hashtagId, postId];

  return connection.query(query, values);
}

async function selectPostById(id) {
  const query = `SELECT id, "userId" FROM posts WHERE id=$1`;
  const value = [id];

  return connection.query(query, value);
}

async function deletePostFromHashtagsPosts(postId) {
  const query = `DELETE FROM "hashtagsPosts" WHERE "postId"=$1`;
  const value = [postId];

  return connection.query(query, value);
}

async function deletePostById(id) {
  const query = `DELETE FROM posts WHERE id=$1`;
  const value = [id];

  return connection.query(query, value);
}

export const newPostRepository = {
  getHashtags,
  getHashtagsByName,
  getPosts,
  addNewPost,
  addNewHashtag,
  addNewHashtagPost,
  selectPostById,
  deletePostFromHashtagsPosts,
  deletePostById,
};
