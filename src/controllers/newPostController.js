import connection from "../config/db";

export default function newPost(req, res){
    const  newPost  = res.locals.post
    const  userId  = res.locals.id
    
    try{
        await connection.query(`INSERT INTO posts (url, message, "userId") VALUES ($1, $2, $3, $4)`, [newPost.url, newPost.message, userId ]);
        res.sendStatus(201);

    }catch (error){
        res.sendStatus(error)
    }
}
