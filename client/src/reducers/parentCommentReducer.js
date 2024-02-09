import { createSlice } from '@reduxjs/toolkit';
import parentCommentService from '../services/parentComments';

const parentCommentsSlice = createSlice({
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

export const { setComments, addComment } = parentCommentsSlice.actions;

export const initializeComments = (postId) => {
  return async (dispatch) => {
    const allComments = await parentCommentService.getAllPostComments(postId);
    dispatch(setComments(allComments));
  };
};

export const createComment = (postId, comment) => {
  return async (dispatch) => {
    const createdComment = await parentCommentService.createParentComment(
      postId,
      comment
    );

    const addedPostId = {
      ...createdComment,
      postId,
    };

    dispatch(addComment(addedPostId));
  };
};

export default parentCommentsSlice.reducer;
