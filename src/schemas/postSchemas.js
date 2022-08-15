import joi from "joi";

const newPostSchema = joi.object({
    url: joi.string().uri().required(),
    message: joi.string().min(0)
});

export default { newPostSchema };