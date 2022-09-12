/**HERE WE PLACE ALL THE FUNCTIONS FOR THE COMMUNICATIONS WITH THE BACKEND */
import { default as axios } from "axios";

import { BASEURL } from "../config";

const authorization = () => {
  // NOT GOOD FOR PRODUCTION! should'nt be saved in local storage
  let JWT = localStorage.getItem("JWT");

  // TODO: delete it:
  if (JWT === null) JWT = "aaaaaaa";

  const configAuthorization = {
    headers: {
      Authorization: "Bearer " + JWT,
    },
  };
  return configAuthorization;
};

/**User - End Points
 * -------------------------------------------------
 */
const USER = "user/";

export const isSigned = () => {
  const authorize = authorization();

  return axios.get(BASEURL + USER + "users/me/", authorize);
};

export const signUP = (userData) => {
  return axios.post(BASEURL + "user/sign-up", userData);
};

export const signIN = (namePass) => {
  let formData = new FormData();
  formData.append("username", namePass.username);
  formData.append("password", namePass.password);

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  // should return JWT token, best for it to be saved in memory.
  // the return should be found in the headers (bearer schema)
  return axios.post(BASEURL + USER + "token", formData, config);
};

/**Drive - End Points:
 * -------------------------------------------------------------------
 */
const DRIVE = "drive/";

export const POSTdrive = (drive) => {
  const authorize = authorization();
  return axios.post(BASEURL + DRIVE + "create", drive, authorize);
};

export const GETdrives = (longitude, latitude, skip = 0, limit = 1) => {
  const authorize = authorization();

  return axios.get(
    `${BASEURL}${DRIVE}drives?longitude=${longitude}&latitude=${latitude}&skip=${skip}&limit=${limit}`,
    authorize
  );
};
