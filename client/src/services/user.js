import axios from 'axios';
const baseUrl = '/api/users';

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
  const response = await axios.post(`${baseUrl}`, userObject);
  return;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const deleteAccount = async (userId) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${userId}`, config);
};

export default { createUser, getUser, deleteAccount, setToken };
