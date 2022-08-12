import timelineRepository from "../repositories/timelineRepository.js";
import urlMetadata from "url-metadata";

const getPosts = async (req, res) => {
    let postsData = [];

    try {
        function savePostsData({ post, metadata }) {
			const { title, image, description } = metadata;
			postsData.push({ ...post, urlInfo: { title, image, description } });
		};

        const { rows: result } = await timelineRepository.getPosts();

		const arrayMap = result.map((post) =>
			new Promise(async (resolve, reject) => {
				const metadata = await urlMetadata(`${post.url}`);
				resolve({ post, metadata });
			}).then(savePostsData)
		);

		await Promise.all(arrayMap);
        res.status(200).send(postsData);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

async function getTrendingList(req,res){
	
	try{
		const trendingList = await timelineRepository.getTredingHashtags()
		
		res.status(200).send(trendingList.rows)
		
	  }catch (error){
		res.sendStatus(error)
	  }    
	
	}
















export { getPosts, getTrendingList };