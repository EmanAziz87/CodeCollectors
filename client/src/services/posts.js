import axios from 'axios';
const baseUrl = '/api/posts';

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
  const allPosts = await axios.get(`${baseUrl}`);
  return allPosts.data;
};

const createPost = async (newPost) => {
  const config = {
    headers: { Authorization: token },
  };
  const createdPost = await axios.post(`${baseUrl}`, newPost, config);
  return createdPost.data;
};

const editPost = async (postId, postObject) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.patch(`${baseUrl}/${postId}`, postObject, config);
};

const deletePost = async (postId) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${postId}`, config);
};

export default { getPosts, createPost, deletePost, editPost, setToken };
