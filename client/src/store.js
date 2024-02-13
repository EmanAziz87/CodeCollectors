import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import hubsReducer from './reducers/hubsReducer';
import postsReducer from './reducers/postsReducer';
import snippetsReducer from './reducers/snippetsReducer';
import commentReducer from './reducers/commentReducer';
import postLikesReducer from './reducers/postLikesReducer';
import commentLikesReducer from './reducers/commentLikesReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    hubs: hubsReducer,
    posts: postsReducer,
    snippets: snippetsReducer,
    comments: commentReducer,
    postLikes: postLikesReducer,
    commentLikes: commentLikesReducer,
  },
});

export default store;
