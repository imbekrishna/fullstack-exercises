import axios from 'axios';
const baseUrl = '/api/blogs';
let bearerToken;

const setToken = (token) => {
  bearerToken = token;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: `Bearer ${bearerToken}` } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, updatedBlog) => {
  const config = { headers: { Authorization: `Bearer ${bearerToken}` } };
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: `Bearer ${bearerToken}` } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const like = async (id) => {
  const response = await axios.post(`${baseUrl}/like/${id}`);
  return response.data;
};

export default { getAll, getOne, create, update, remove, like, setToken };
