import axios from "axios";

// missing update, remove fcns

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api/projects`;

async function getAll(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.get(baseUrl, config);
}

async function create(newObject, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return axios.post(baseUrl, newObject, config);
}

export default {
  getAll,
  create,
};
