import axios from 'axios';
const baseUrl = 'http://localhost:5173/api';

const getHubs = async () => {
  const allHubs = await axios.get(`${baseUrl}/hubs`);
  return allHubs.data;
};

export default { getHubs };
