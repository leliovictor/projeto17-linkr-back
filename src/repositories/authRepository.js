import connection from "../config/db.js";

async function selectUserByEmail(email) { 
    const query = `SELECT * FROM users WHERE email=$1`;
    
    const value = [email];
    
    return connection.query(query,value);
}

async function selectUserByUsername(username) {
    const query = `SELECT * FROM users WHERE username=$1`;
    
    const value = [username];
    
    return connection.query(query,value);
}

async function insertUserAtUsers(email, password, username, pictureUrl) {
    const query = `INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1,$2,$3,$4)`;

    const values = [email, password, username, pictureUrl];

    return connection.query(query, values);
}

export const authRepository = {
    selectUserByEmail,
    selectUserByUsername,
    insertUserAtUsers
};