import axios from 'axios';
const baseUrl = '/api/blogs';
let bearerToken;

const setToken = (token) => {
  bearerToken = token;
};

export const getAll = () => axios.get(baseUrl).then((res) => res.data);

export const createBlog = (newBlog) =>
  axios
    .post(baseUrl, newBlog, {
      headers: { Authorization: `Bearer ${bearerToken}` },
    })
    .then((res) => res.data);

export const updateBlog = (updatedBlog) => {
  const config = { headers: { Authorization: `Bearer ${bearerToken}` } };
  return axios
    .put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
    .then((res) => res.data);
};

export const removeBlog = (id) => {
  const config = { headers: { Authorization: `Bearer ${bearerToken}` } };
  return axios.delete(`${baseUrl}/${id}`, config).then((res) => res.data);
};

export default { setToken };
