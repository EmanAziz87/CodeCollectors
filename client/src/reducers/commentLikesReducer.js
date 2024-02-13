import { createSlice } from '@reduxjs/toolkit';
import likeService from '../services/likes';

const commentLikeSlice = createSlice({
  name: 'commentLikes',
  initialState: [],
  reducers: {
    setCommentLikes(state, action) {
      return action.payload;
    },
  },
});

export const { setCommentLikes } = commentLikeSlice.actions;

export const initializeCommentLikes = () => {
  return async (dispatch) => {
    const commentLikes = await likeService.getCommentLikes();
    dispatch(setCommentLikes(commentLikes));
  };
};

export const likeComment = (commentId) => {
  return async (dispatch) => {
    await likeService.likeComment(commentId);
    dispatch(initializeCommentLikes());
  };
};

export default commentLikeSlice.reducer;
