import connection from "../config/db.js";

async function getHashtags(){
    const query = `SELECT * FROM hashtags`

    return connection.query(query)

}

async function getHashtagsByName(hashtag){
    const query = `SELECT * FROM hashtags WHERE hashtag=$1`

    const value = [hashtag]

    return connection.query(query,value)

}

async function getPosts(message, userId){
    const query = `SELECT * FROM posts WHERE (message=$1 AND "userId" = $2) ORDER BY id DESC`;

    const value = [message, userId]

    return connection.query(query, value)
}

async function addNewPost (url, message, userId){
    const query = `INSERT INTO posts (url, message, "userId") VALUES ($1, $2, $3)`;

    const values = [url, message, userId];

    return connection.query(query,values);
}

async function addNewHashtag(hashtag){
    const query = `INSERT INTO hashtags (hashtag) VALUES ($1)`;

    const value = [hashtag];

    return connection.query(query,value);
}

async function addNewHashtagPost(url, hashtagId, postId){

    const query = `INSERT INTO "hashtagsPosts" (url, "hashtagId", "postId") VALUES ($1, $2, $3)`;

    const values = [url, hashtagId, postId];

    return connection.query(query,values);
}

export const newPostRepository =  {getHashtags, getHashtagsByName, getPosts, addNewPost, addNewHashtag, addNewHashtagPost}