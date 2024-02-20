import axios from 'axios';
const baseUrl = 'http://localhost:5173/api';

const login = async (loginObject) => {
  const response = await axios.post(`${baseUrl}/login`, loginObject);
  return response.data;
};

export default { login };
