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

const timelineRepository = {
    getPosts,
    post,
    like,
    dislike,
    insertLiker,
    deleteLiker
};


export default timelineRepository;