import { createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comments';

const commentsSlice = createSlice({
  name: 'parentComments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return [...action.payload];
    },
    addComment(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;

export const initializeComments = (postId) => {
  return async (dispatch) => {
    const allComments = await commentService.getComments(postId);
    dispatch(setComments(allComments));
  };
};

export const createComment = (postId, comment) => {
  return async (dispatch) => {
    const createdComment = await commentService.createComment(postId, comment);

    const addedPostId = {
      ...createdComment,
      postId,
    };

    dispatch(addComment(addedPostId));
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch) => {
    await commentService.deleteComment(commentId);
    dispatch(initializeComments(commentId));
  };
};

export default commentsSlice.reducer;
