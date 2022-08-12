import connection from "../config/db.js";

async function getPosts () {
    return connection.query(`
    SELECT  users.username, users."pictureUrl", posts.url, posts.message, posts."userId", posts.likes, posts.id
    FROM users 
    JOIN posts ON posts."userId" = users.id
    ORDER BY posts.id DESC
    LIMIT 20`
    );
};

const timelineRepository = {
    getPosts
};


export default timelineRepository;