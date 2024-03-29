import { default as axios } from "axios";

import { ACCESS_KEY, API_BASEURL } from "../config";
import { GeoJSON_Point, query as schemaQuery } from "../validation/newRide";

const _constructURL = (query, type) => {
  return `${API_BASEURL}${type}?access_key=${ACCESS_KEY}&query=${query}`;
};

const _constructError = (reason) => {
  return new Promise((resolve, reject) => {
    reject(reason.details[0].message);
  });
};

export const reverseGeoCode = (geoJSON_Point) => {
  // validate with the schema
  const validated = GeoJSON_Point.validate(geoJSON_Point);
  if (validated.error) {
    return _constructError(validated.error);
  }

  // EXPLAIN: The api expect lat long (we need to swap and send)
  const query = `${geoJSON_Point.coordinates[1]},${geoJSON_Point.coordinates[0]}`;
  const url = _constructURL(query, "reverse");
  return axios.get(url);
};

export const forwardGeoCode = (query) => {
  const validated = schemaQuery.validate(query);
  if (validated.error) {
    return _constructError(validated.error);
  }

  const url = _constructURL(query, "forward");
  return axios.get(url);
};
