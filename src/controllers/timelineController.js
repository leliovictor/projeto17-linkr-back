import timelineRepository from "../repositories/timelineRepository.js";

async function getTrendingList(req,res){
	
	try{
		const { rows: trendingList } = await timelineRepository.getTredingHashtags()
		
		res.status(200).send(trendingList)
	} catch (error) {
		res.sendStatus(500)
	};
};

export { getTrendingList };
