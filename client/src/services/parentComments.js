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

const createParentComment = async (postId, commentObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${baseUrl}/comments/${postId}`,
    commentObject,
    config
  );
  return response.data;
};

export default { createParentComment, setToken };
