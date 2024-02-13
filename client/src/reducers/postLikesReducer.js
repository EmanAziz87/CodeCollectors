import { createSlice } from '@reduxjs/toolkit';
import likeService from '../services/likes';

const postLikeSlice = createSlice({
  name: 'postLikes',
  initialState: [],
  reducers: {
    setPostLikes(state, action) {
      return action.payload;
    },
  },
});

export const { setPostLikes } = postLikeSlice.actions;

export const initializePostLikes = () => {
  return async (dispatch) => {
    const postLikes = await likeService.getPostLikes();
    dispatch(setPostLikes(postLikes));
  };
};

export const likePost = (postId) => {
  return async (dispatch) => {
    await likeService.likePost(postId);
    dispatch(initializePostLikes());
  };
};

export default postLikeSlice.reducer;
