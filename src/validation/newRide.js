/**
 * Joi for client side validation
 */

import Joi from "joi";

import { DriveTypes } from "../const";
// FIXME: lon first
export const GeoJSON_Point = Joi.object()
  .keys({
    type: Joi.string()
      .required()
      .valid("Point"),
    coordinates: Joi.array().ordered(
      Joi.number()
        .min(-180)
        .max(180)
        .required(),
      Joi.number()
        .min(-90)
        .max(90)
        .required(),
    ),
  })
  .description("Please use this format [ longitude, latitude]");

export const query = Joi.string().alphanum().min(5).required().label("query");

export const newDrive = Joi.object({
  driveType: Joi.string()
    .valid(...DriveTypes)
    .required(),

  header: Joi.string()
    .alphanum()
    .min(10)
    .max(35)
    .required(),

  body: Joi.string()
    .alphanum()
    .min(20)
    .max(100)
    .required(),

  locationInput: GeoJSON_Point,

  destination: GeoJSON_Point,
});
