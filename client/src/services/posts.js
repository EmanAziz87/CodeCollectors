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

export default { getPosts, createPost, setToken };
