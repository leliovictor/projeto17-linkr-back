import  addNewPost  from "../repositories/newPostRepository.js";

export async function newPost(req, res){
    const  newPost  = res.locals.body;
    const  data  = res.locals.data;

    try{
        await addNewPost(newPost.url, newPost.message, data.id);
        res.sendStatus(201);
    }catch (error){
        res.sendStatus(error)
    }
}
