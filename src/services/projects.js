import axios from "axios";

// missing update, remove fcns

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/projects`;

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



export default {
  getAll,
  getOne,
  create,
  update
};
