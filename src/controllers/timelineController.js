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
		//console.log("result:", result)

		const arrayMap = result.map((post) =>
			new Promise(async (resolve, reject) => {
				const metadata = await urlMetadata(`${post.url}`);
				resolve({ post, metadata });
			}).then(savePostsData)
		);

		await Promise.all(arrayMap);
		//console.log("postsData: ", postsData)

        res.status(200).send(postsData);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const like = async (req, res) => {
	const postId = req.params.post;
	const { userId } = req.body

	try {
		const { rows: post } = await timelineRepository.post(postId);
		await timelineRepository.like(post[0].likes, postId);
		await timelineRepository.insertLiker(userId, postId);

		res.sendStatus(200);
	} catch (error) {
		console.log("error like:", error);
		res.status(500).send(error);
	};
};

const dislike = async (req, res) => {
	const postId = req.params.post;
	const { userId } = req.body

	try {
		const { rows: post } = await timelineRepository.post(postId);
		await timelineRepository.dislike(post[0].likes, postId);
		await timelineRepository.deleteLiker(userId, postId);

		res.sendStatus(200);
	} catch (error) {
		console.log("error dislike:", error);
		res.status(500).send(error);
	};
};

export { getPosts, like, dislike };