import axios from 'axios';
const baseUrl = 'http://localhost:5173/api/likes';

let token;

const setToken = (user) => {
  if (user) {
    token = `Bearer ${user.token}`;
  } else {
    token = null;
  }

  return token;
};

const getPostLikes = async () => {
  const response = await axios.get(`${baseUrl}/posts`);
  return response.data;
};

const likePost = async (postId) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.post(`${baseUrl}/posts/${postId}`, {}, config);
};

const getCommentLikes = async () => {
  const response = await axios.get(`${baseUrl}/comments`);
  return response.data;
};

const likeComment = async (commentId) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.post(`${baseUrl}/comments/${commentId}`, {}, config);
};

export default {
  getPostLikes,
  getCommentLikes,
  likeComment,
  likePost,
  setToken,
};
