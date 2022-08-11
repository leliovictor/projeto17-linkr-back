import joi from "joi";

const newPostSchema = joi.object({
    url: joi.string().uri().required(),
    message: joi.string(255)
});

export default { newPostSchema };