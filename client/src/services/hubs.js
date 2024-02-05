import axios from 'axios';
const baseUrl = 'http://localhost:5173';

const getHubs = async () => {
  const allHubs = await axios.get(`${baseUrl}/api/hubs`);
  return allHubs.data;
};

export default { getHubs };
