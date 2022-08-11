import connection from "../config/db.js";

export default async function addNewPost (url, message, userId){
    const query = `INSERT INTO posts (url, message, "userId") VALUES ($1, $2, $3, $4)`;

    const valeus = [url, message, userId];

    return connection.query(query,value);
}