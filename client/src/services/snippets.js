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

const getAllSnippets = async () => {
  const response = await axios.get(`${baseUrl}/snippets`);
  return response.data;
};

const createSnippet = async (snippetObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const snippet = await axios.post(
    `${baseUrl}/snippets`,
    snippetObject,
    config
  );
  return snippet.data;
};

export default { getAllSnippets, createSnippet, setToken };
