import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import hubsReducer from './reducers/hubsReducer';
import postsReducer from './reducers/postsReducer';
import snippetsReducer from './reducers/snippetsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    hubs: hubsReducer,
    posts: postsReducer,
    snippets: snippetsReducer,
  },
});

export default store;
