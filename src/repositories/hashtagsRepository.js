import connection from "../config/db.js";

///busca posts que tenham a hashtag ecolhida pelo usuário na trending///

async function getPostsByHashtags(hashtag){
    const query = `SELECT u.id AS "userId", u.username AS "userName", u."pictureUrl" AS "userPicture", p.url AS "postUrl", p.message AS "postMessage", p.likes AS likes
    FROM users u
    JOIN posts p
    ON p."userId" = u.id
    JOIN "hashtagsPosts" hp
    ON hp."postId" = p.id
    JOIN hashtags h
    ON hp."hashtagId" = h.id
    WHERE p.message ILIKE $1`

    const value = [`%${hashtag}%`]

    return connection.query(query, value)
}

const hashtagsRepository = {
    getPostsByHashtags
}

export default hashtagsRepository;