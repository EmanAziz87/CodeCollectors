import { createSlice } from '@reduxjs/toolkit';
import hubService from '../services/hubs';
import { addToSubs, removeFromSubs } from './userReducer';

const hubsSlice = createSlice({
  name: 'hubs',
  initialState: [],
  reducers: {
    setHubs(state, action) {
      return action.payload;
    },
    alreadySubbed(state, action) {
      return state;
    },
    unSub(state, action) {},
  },
});

export const { setHubs, alreadySubbed } = hubsSlice.actions;

export const initializeHubs = () => {
  return async (dispatch) => {
    const allHubs = await hubService.getHubs();
    dispatch(setHubs(allHubs));
  };
};

export const subscribeToHub = (passedHub) => {
  return async (dispatch, getState) => {
    const alreadySubscribed = getState().user.subscribedHubs.find(
      (hub) => hub === passedHub.name
    );

    if (alreadySubscribed) {
      const hubs = getState().hubs;

      const newHubState = hubs.map((hub) =>
        hub.id !== passedHub.id
          ? hub
          : { ...hub, subscribers: passedHub.subscribers - 1 }
      );

      console.log('NEWHUBSTATE', newHubState);

      dispatch(setHubs(newHubState));
      dispatch(removeFromSubs(passedHub.name));

      await hubService.subscribeToHub(passedHub.id, {
        subscribers: passedHub.subscribers - 1,
      });
    } else {
      const hubs = getState().hubs;

      const newHubState = hubs.map((hub) =>
        hub.id !== passedHub.id
          ? hub
          : { ...hub, subscribers: passedHub.subscribers + 1 }
      );
      console.log('NEWHUBSTATE', newHubState);

      dispatch(setHubs(newHubState));
      dispatch(addToSubs(passedHub.name));

      await hubService.subscribeToHub(passedHub.id, {
        subscribers: passedHub.subscribers + 1,
      });
    }
  };
};

export default hubsSlice.reducer;
