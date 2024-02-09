import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import hubsReducer from './reducers/hubsReducer';
import postsReducer from './reducers/postsReducer';
import snippetsReducer from './reducers/snippetsReducer';
import parentCommentReducer from './reducers/parentCommentReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    hubs: hubsReducer,
    posts: postsReducer,
    snippets: snippetsReducer,
    parentComments: parentCommentReducer,
  },
});

export default store;
