import Joi from "joi";

export const signUpSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(6).required(),
});


export const verifyEmailSchema = Joi.object({
  otp: Joi.string().length(6).required(),
});


export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});



export const signOutSchema = Joi.object({
  refreshToken: Joi.string().required(),
});


export const resendOtpSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
});