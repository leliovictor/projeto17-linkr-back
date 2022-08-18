import connection from "../config/db.js";

async function getTredingHashtags(){
    const query = `SELECT hp."hashtagId" AS "hashtagId", h.hashtag AS hashtag, COUNT(hp."postId") AS "hashtagCount" FROM "hashtagsPosts" hp
    JOIN hashtags h
    ON h.id = hp."hashtagId"
    GROUP BY hp."hashtagId", h."hashtag" ORDER BY "hashtagCount" DESC LIMIT 10`

    return connection.query(query)
}

async function countUserFollowing(id) {
    const query = `
    SELECT COUNT(request) FROM followers WHERE request=$1 GROUP BY request
    `;
    const value = [id];

    return connection.query(query, value);
}

export const timelineRepository = {
    getTredingHashtags,
    countUserFollowing,
}

