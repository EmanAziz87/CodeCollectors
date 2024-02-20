import axios from 'axios';
const baseUrl = 'api';

let token;

const setToken = (user) => {
  if (user) {
    token = `Bearer ${user.token}`;
  } else {
    token = null;
  }

  return token;
};

const getComments = async (postId) => {
  const response = await axios.get(`${baseUrl}/comments/${postId}`);
  return response.data;
};

const createComment = async (postId, commentObject) => {
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

const editComment = async (commentId, commentObject) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.patch(`${baseUrl}/comments/${commentId}`, commentObject, config);
};

const deleteComment = async (commentId) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/comments/${commentId}`, config);
};

export default {
  getComments,
  createComment,
  deleteComment,
  editComment,
  setToken,
};
