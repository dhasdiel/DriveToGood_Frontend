/**
 * Joi for client side validation
 */

import Joi from "joi";

const DriveTypes = [
  "Transporting Patient",
  "Hospital",
  "Food Distribution",
  "Roadside Assistance",
  "transportation Of Medical Equipment",
];
// @remember: lon first
export const GeoJSON_Point = Joi.object()
  .keys({
    type: Joi.string()
      .required()
      .valid(["Point"]),
    coordinates: Joi.array().ordered([
      Joi.number()
        .min(-180)
        .max(180)
        .required(),
      Joi.number()
        .min(-90)
        .max(90)
        .required(),
    ]),
  })
  .description("Please use this format [ longitude, latitude]");

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
