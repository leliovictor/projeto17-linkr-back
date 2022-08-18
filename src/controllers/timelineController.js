import { timelineRepository } from "../repositories/timelineRepository.js";

export async function getTrendingList(_req, res) {
	try{

		const trendingList = await timelineRepository.getTredingHashtags();
		
		return res.status(200).send(trendingList.rows);
		
	} catch (error){
		return res.sendStatus(500);
	}
	
};