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
    removeFromSubs(state, action) {
      return {
        ...state,
        subscribedHubs: [
          ...state.subscribedHubs.filter((hub) => hub !== action.payload),
        ],
      };
    },
  },
});

export const { addUser, removeUser, addToSubs, removeFromSubs } =
  userSlice.actions;

export const autoReLogin = (loggedUser) => {
  return async (dispatch) => {
    const originalLoggedUser = await userService.getUser(loggedUser.id);
    dispatch(addUser({ token: loggedUser.token, ...originalLoggedUser }));
  };
};

export const deleteAccount = (loggedUserId) => {
  return async (dispatch) => {
    await userService.deleteAccount(loggedUserId);
    dispatch(removeUser(null));
  };
};

export default userSlice.reducer;
