import axios from "axios";
const baseUrl = "/api/blogs";
let bearerToken;

const setToken = (token) => {
  bearerToken = token;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: `Bearer ${bearerToken}` } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export default { getAll, create, setToken };
