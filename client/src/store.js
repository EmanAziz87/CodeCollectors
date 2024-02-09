import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import hubsReducer from './reducers/hubsReducer';
import postsReducer from './reducers/postsReducer';
import snippetsReducer from './reducers/snippetsReducer';
import parentCommentReducer from './reducers/parentCommentReducer';
import replyCommentReducer from './reducers/replyCommentReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    hubs: hubsReducer,
    posts: postsReducer,
    snippets: snippetsReducer,
    parentComments: parentCommentReducer,
    replyComments: replyCommentReducer,
  },
});

export default store;
