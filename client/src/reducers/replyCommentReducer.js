import { createSlice } from '@reduxjs/toolkit';
import replyCommentService from '../services/replyComments';

const replyCommentsSlice = createSlice({
  name: 'replyComments',
  initialState: [],
  reducers: {
    setReplies(state, action) {
      return [...action.payload];
    },
    addReply(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { setReplies, addReply } = replyCommentsSlice.actions;

export const initializeReplies = () => {
  return async (dispatch) => {
    const allReplies = await replyCommentService.getAllReplyComments();
    dispatch(setReplies(allReplies));
  };
};

export const createReply = (parentCommentId, reply) => {
  return async (dispatch) => {
    const createdReply = await replyCommentService.createReplyComment(
      parentCommentId,
      reply
    );

    const addedParentId = {
      ...createdReply,
      parentCommentId,
    };

    dispatch(addReply(addedParentId));
  };
};

export default replyCommentsSlice.reducer;
