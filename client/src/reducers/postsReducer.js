import { createSlice } from '@reduxjs/toolkit';
import postService from '../services/posts';
import snippetService from '../services/snippets';
import { addSnippet } from './snippetsReducer';

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

export const createPost = (newPost, newSnippet, hub) => {
  return async (dispatch, getState) => {
    snippetService.setToken(getState().user);
    const createdSnippet = await snippetService.createSnippet(newSnippet);
    const addAuthor = {
      ...newPost,
      author: getState().user.username,
      userId: getState().user.id,
      snippetId: createdSnippet.id,
      hubId: hub.id,
    };
    const createdPost = await postService.createPost(addAuthor);
    dispatch(addSnippet(createdSnippet));
    dispatch(addPost(createdPost));
  };
};

export default postsSlice.reducer;
