import axios from "axios";

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/users`;

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