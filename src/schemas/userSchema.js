import joi from "joi";

const userLike = joi.object({
  username: joi.string().min(3).required(),
});

const userFollow = joi.object({
  followId: joi.number().greater(0).required(),
  followStatus: joi.boolean().required(),

});

export { userLike, userFollow };
