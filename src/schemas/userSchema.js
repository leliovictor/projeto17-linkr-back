import joi from "joi";

const userLike = joi.object({
  username: joi.string().min(3).required(),
});

export default { userLike };
