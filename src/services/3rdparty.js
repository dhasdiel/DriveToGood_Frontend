import axios from "axios";

const BASEURL = "https://api.bigdatacloud.net/data/";

export function reverseGeoCode(longitude, latitude) {
  return axios.get(
    `${BASEURL}reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
}
