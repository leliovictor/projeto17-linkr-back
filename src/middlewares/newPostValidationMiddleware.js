import { newPostSchema } from '../utilities/schemas.js';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWT_SECRET

export default async function newPostMiddleware(req, res, next) {
    const newPost = req.body;
    const validation = newPostSchema.validate(newPost);
    const { error } = validation

    if(error){
    const errorMsgs = error.details.map(err => err.message)
    res.status(422).send(errorMsgs)
    return;
    }

    try{
        res.locals.post = newUrl.post
        
    next();

    }catch (error){
        res.sendStatus(error)
    }
}