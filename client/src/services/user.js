import axios from 'axios';
const baseUrl = 'http://localhost:5173/api';

let token;

const setToken = (user) => {
  if (user) {
    token = `Bearer ${user.token}`;
  } else {
    token = null;
  }
  return token;
};

const createUser = async (userObject) => {
  const response = await axios.post(`${baseUrl}/users`, userObject);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/users/${id}`);
  return response.data;
};

const deleteAccount = async (userId) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/users/${userId}`, config);
};

export default { createUser, getUser, deleteAccount, setToken };
