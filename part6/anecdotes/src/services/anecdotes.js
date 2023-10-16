import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const response = axios.post(baseUrl, { content, votes: 0 });
  return (await response).data;
};

export default { getAll, create };
