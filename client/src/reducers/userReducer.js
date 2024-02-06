import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return action.payload;
    },
    addToSubs(state, action) {
      const duplicateFound = state.subscribedHubs.find(
        (hub) => hub === action.payload
      );
      if (duplicateFound) {
        return state;
      } else {
        return {
          ...state,
          subscribedHubs: [...state.subscribedHubs, action.payload],
        };
      }
    },
  },
});

export const { addUser, removeUser, addToSubs } = userSlice.actions;

export const autoReLogin = (loggedUser) => {
  return async (dispatch) => {
    const originalLoggedUser = await userService.getUser(loggedUser.id);
    dispatch(addUser({ token: loggedUser.token, ...originalLoggedUser }));
  };
};

export default userSlice.reducer;
