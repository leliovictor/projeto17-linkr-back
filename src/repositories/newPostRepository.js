import connection from "../config/db.js";

export default async function addNewPost (url, message, userId){
    const query = `INSERT INTO posts (url, message, "userId") VALUES ($1, $2, $3)`;

    const values = [url, message, userId];

    return connection.query(query,values);
}