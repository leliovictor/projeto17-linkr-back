import timelineRepository from "../repositories/timelineRepository.js";

async function getTrendingList(req,res){
	
	try{
		const trendingList = await timelineRepository.getTredingHashtags()
		
		res.status(200).send(trendingList.rows)
		
	  }catch (error){
		res.sendStatus(error)
	  }    
	
	};

export { getTrendingList };
