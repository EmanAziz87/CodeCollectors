import { createSlice } from '@reduxjs/toolkit';
import hubService from '../services/hubs';

const hubsSlice = createSlice({
  name: 'hubs',
  initialState: [],
  reducers: {
    setHubs(state, action) {
      return action.payload;
    },
  },
});

export const { setHubs } = hubsSlice.actions;

export const initializeHubs = () => {
  return async (dispatch) => {
    const allHubs = await hubService.getHubs();
    dispatch(setHubs(allHubs));
  };
};

export default hubsSlice.reducer;
