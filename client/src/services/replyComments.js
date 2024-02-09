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

const getAllReplyComments = async () => {
  const response = await axios.get(`${baseUrl}/replies/`);
  return response.data;
};

const createReplyComment = async (parentId, replyObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${baseUrl}/replies/${parentId}`,
    replyObject,
    config
  );
  return response.data;
};

export default { getAllReplyComments, createReplyComment, setToken };
