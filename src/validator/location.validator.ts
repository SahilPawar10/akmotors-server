import Joi from "joi";
import { ValidationSchema } from "./custom.validation.js";

export const addLocationSchema: ValidationSchema = {
  body: Joi.object().keys({
    villageName: Joi.string().required(),
    region: Joi.string().optional(),
    taluka: Joi.string().required(),
  }),
};

export const getLocationByRegion: ValidationSchema = {
  body: Joi.object().keys({
    region: Joi.string().optional(),
  }),
};
