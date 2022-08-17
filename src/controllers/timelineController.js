import timelineRepository from "../repositories/timelineRepository.js";

async function getTrendingList(_req,res){
	
	try{

		const trendingList = await timelineRepository.getTredingHashtags();
		
		return res.status(200).send(trendingList.rows);
		
	} catch (error){
		return res.sendStatus(500);
	}
	
};


export { getTrendingList };
