import axios from 'axios';
const baseUrl = '/api/users';

export const summary = () =>
  axios.get(`${baseUrl}/summary`).then((res) => res.data);

export const getUser = (id) =>
  axios.get(`${baseUrl}/${id}`).then((res) => res.data);
