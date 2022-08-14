import connection from "../config/db.js";

async function getPosts () {
    return connection.query(`
    SELECT  users.username, users."pictureUrl", posts.url, posts.message, posts."userId", posts.likes, posts.id AS "postId"
    FROM users 
    JOIN posts ON posts."userId" = users.id
    ORDER BY posts.id DESC
    LIMIT 20`
    );
};

async function post (id) {
    return connection.query(`
    SELECT * FROM posts WHERE id = $1`, [id])
};

async function like (likes, id) {
    return connection.query(`
        UPDATE posts 
        SET likes = $1
        WHERE id = $2`,
        [(likes + 1), id])
};

async function dislike (likes, id) {
    return connection.query(`
        UPDATE posts 
        SET likes = $1
        WHERE id = $2`,
        [(likes - 1), id])
};

async function insertLiker (userId, postId) {
    return connection.query(`
    INSERT INTO "postsUsers-likes" ("userId", "postId")
    VALUES ($1, $2)`,
    [userId, postId]
    )
};

async function deleteLiker (userId, postId) {
    return connection.query(`
    DELETE FROM "postsUsers-likes" WHERE "userId" = $1 AND "postId" = $2`,
    [userId, postId]
    )
};

async function usersWhoLikedThePost (postId) {
    return connection.query(`
    SELECT users.username
	FROM users
	JOIN "postsUsers-likes" ON "postsUsers-likes"."userId" = users.id
	WHERE "postsUsers-likes"."postId" = $1`, 
    [postId])
};

async function getTredingHashtags(){
    const query = `SELECT hp."hashtagId" AS "hashtagId", h.hashtag AS hashtag, COUNT(hp."postId") AS "hashtagCount" FROM "hashtagsPosts" hp
    JOIN hashtags h
    ON h.id = hp."hashtagId"
    GROUP BY hp."hashtagId", h."hashtag" ORDER BY "hashtagCount" DESC LIMIT 10`

    return connection.query(query)
}

const timelineRepository = {
    getPosts,
    post,
    like,
    dislike,
    insertLiker,
    deleteLiker,
    usersWhoLikedThePost,
    getTredingHashtags
};

export default timelineRepository;