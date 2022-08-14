import joi from "joi";

const signUp = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  username: joi.string().required(),
  pictureUrl: joi.string().pattern(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|svg))/).required(),
});

const signIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export { signIn, signUp };
