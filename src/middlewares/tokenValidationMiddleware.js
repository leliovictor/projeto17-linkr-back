
import connection from '../database.js'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export default async function tokenMiddleware(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const loggedUser = await connection.query(`
    SELECT * FROM users WHERE id=$1`, [userId])
    if (!loggedUser.rows[0]) {
        return res.status(401).send('Unauthorized');
    }
    res.locals.id = loggedUser.rows[0].id
    
    next();
}