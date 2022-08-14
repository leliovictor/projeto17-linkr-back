import connection from "../config/db.js";

async function getTredingHashtags(){
    const query = `SELECT hp."hashtagId" AS "hashtagId", h.hashtag AS hashtag, COUNT(hp."postId") AS "hashtagCount" FROM "hashtagsPosts" hp
    JOIN hashtags h
    ON h.id = hp."hashtagId"
    GROUP BY hp."hashtagId", h."hashtag" ORDER BY "hashtagCount" DESC LIMIT 10`

    return connection.query(query)
}

const timelineRepository = {
    getTredingHashtags
}

export default timelineRepository;