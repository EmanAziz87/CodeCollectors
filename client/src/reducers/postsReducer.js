import { createSlice } from '@reduxjs/toolkit';
import postService from '../services/posts';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    setPosts(state, action) {
      return action.payload;
    },
    addPost(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { setPosts, addPost } = postsSlice.actions;

export const initializePosts = () => {
  return async (dispatch) => {
    const allPosts = await postService.getPosts();
    dispatch(setPosts(allPosts));
  };
};

export const createPost = (newPost) => {
  return async (dispatch, getState) => {
    const addAuthor = {
      ...newPost,
      author: getState().user.username,
      userId: getState().user.id,
    };
    const createdPost = await postService.createPost(addAuthor);
    dispatch(addPost(createdPost));
  };
};

export default postsSlice.reducer;
