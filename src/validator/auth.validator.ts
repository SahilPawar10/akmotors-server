import Joi from "joi";
import { passwordVerify, ValidationSchema } from "./custom.validation";

// Define interface for validation objects

const register: ValidationSchema = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().optional().required(),
    password: Joi.string().optional().custom(passwordVerify),
    number: Joi.number().required(),
  }),
};

const login: ValidationSchema = {
  body: Joi.object().keys({
    number: Joi.number().required(),
    password: Joi.string().required(),
  }),
};

const logout: ValidationSchema = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens: ValidationSchema = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword: ValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword: ValidationSchema = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(passwordVerify),
  }),
};

const verifyEmail: ValidationSchema = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

export { register, login, logout, refreshTokens, forgotPassword, resetPassword, verifyEmail };
