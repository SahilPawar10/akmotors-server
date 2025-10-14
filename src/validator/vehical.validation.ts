import Joi from "joi";
import { ValidationSchema } from "./custom.validation.js";

export const addVehicleSchema: ValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    ownerNo: Joi.number().required(),
    registrationNumber: Joi.string().required(),
    location: Joi.string().required(),
  }),
};

export const getVehicalByLocation: ValidationSchema = {
  body: Joi.object().keys({
    location: Joi.string().optional(),
  }),
};
