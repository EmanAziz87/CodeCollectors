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

const getPosts = async () => {
  const allPosts = await axios.get(`${baseUrl}/posts`);
  return allPosts.data;
};

const createPost = async (newPost) => {
  const config = {
    headers: { Authorization: token },
  };
  const createdPost = await axios.post(`${baseUrl}/posts`, newPost, config);
  return createdPost.data;
};

const editPost = async (postId, postObject) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.patch(`${baseUrl}/posts/${postId}`, postObject, config);
};

const deletePost = async (postId) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/posts/${postId}`, config);
};

export default { getPosts, createPost, deletePost, editPost, setToken };
