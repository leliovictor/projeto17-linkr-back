import Joi from "joi";

const newPostSchema = Joi.object({
    url: Joi.string().uri().required(),
    message: Joi.string(255)
});

export {newPostSchema}