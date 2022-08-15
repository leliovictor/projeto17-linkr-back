import hashtagsRepository from "../repositories/hashtagsRepository.js";

export async function getPostsByHashtags(req, res){
    const { hashtag } = req.params;
    try{
        const postInfo = await hashtagsRepository.getPostsByHashtags(hashtag)
        return res.status(200).send(postInfo.rows);
    }catch (error){
        return res.sendStatus(error);
    }
}