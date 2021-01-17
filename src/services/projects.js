import axios from "axios";
import { config } from "./constants";

const url = config.url.API_URL;
const baseUrl = `${url}/api/projects`;

function getAll(token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(baseUrl, config);
}

function getOne(id, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(`${baseUrl}/${id}`, config);
}

function create(newObject, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(baseUrl, newObject, config);
}

function update(id, updateObject, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.put(`${baseUrl}/${id}`, updateObject, config);
}

function remove(id, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.delete(`${baseUrl}/${id}`, config);
}



export default {
  getAll,
  getOne,
  create,
  update,
  remove
};
