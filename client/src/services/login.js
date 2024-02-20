import axios from 'axios';
const baseUrl = 'api';

const login = async (loginObject) => {
  const response = await axios.post(`${baseUrl}/login`, loginObject);
  return response.data;
};

export default { login };
