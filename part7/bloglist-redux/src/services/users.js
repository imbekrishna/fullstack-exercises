import axios from 'axios';
const baseUrl = '/api/users';

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};
const summary = async () => {
  const response = await axios.get(`${baseUrl}/summary`);
  return response.data;
};

export default { summary, getUser };
