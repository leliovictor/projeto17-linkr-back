import connection from "../config/db.js";

async function selectUserByEmail(email) { 
    const query = `SELECT * FROM users WHERE email=$1`;
    
    const value = [email];
    
    return connection.query(query,value);
}

export const authRepository = {
    selectUserByEmail
};