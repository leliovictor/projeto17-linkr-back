import connection from "../config/db.js";

async function getPosts () {
    return connection.query(`
    SELECT  users.username, users."pictureUrl", posts.url, posts.message, posts."userId", posts.likes
    FROM users 
    JOIN posts ON posts."userId" = users.id
    ORDER BY posts.id DESC
    LIMIT 20`
    );
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
    getTredingHashtags
};

export default timelineRepository;