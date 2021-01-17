import axios from "axios";
import { config } from "./constants";

const url = config.url.API_URL;
const baseUrl = `${url}/api/users`;

function getAll(token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(baseUrl, config);
}

function getAuthenticatedUser(token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(`${baseUrl}/authenticatedUser`, config);
}

function create(newUser, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(baseUrl, newUser, config);
}

export default {
  getAll,
  getAuthenticatedUser,
  create
};