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

const getHubs = async () => {
  const allHubs = await axios.get(`${baseUrl}/hubs`);
  return allHubs.data;
};

const subscribeToHub = async (id, subsIncreased) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.patch(`${baseUrl}/hubs/${id}`, subsIncreased, config);
};

export default { getHubs, subscribeToHub, setToken };
