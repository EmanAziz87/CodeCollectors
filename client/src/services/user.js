import axios from 'axios';
const baseUrl = 'http://localhost:5173/api';

const createUser = async (userObject) => {
  const response = await axios.post(`${baseUrl}/users`, userObject);
  return response.data;
};

export default { createUser };
