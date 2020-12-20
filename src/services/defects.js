import axios from "axios";

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/defects`;

function getAll(token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(baseUrl, config);
}

function getById(id, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(`${baseUrl}/${id}`, config);
}

function getByProject(projectId, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.get(`${baseUrl}/defects-by-project/${projectId}`, config);
}

function create(newDefect, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post(baseUrl, newDefect, config);
}

function update(id, updateValues, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.put(`${baseUrl}/${id}`, updateValues, config);
}

function remove(id, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.delete(`${baseUrl}/${id}`, config);
}

export default {
  getAll,
  getById,
  getByProject,
  create,
  update,
  remove
};