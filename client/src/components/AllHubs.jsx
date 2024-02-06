import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeHubs, subscribeToHub } from '../reducers/hubsReducer';
import hubService from '../services/hubs';

const AllHubs = () => {
  const dispatch = useDispatch();
  const hubs = useSelector(({ hubs }) => hubs);
  const loggedUser = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeHubs());
  }, []);

  const handleSubscribe = (hub) => {
    hubService.setToken(loggedUser);
    dispatch(subscribeToHub(hub));
  };

  const style = {
    paddingBottom: '12px',
  };

  return (
    <div>
      <h2>All Hubs</h2>{' '}
      <div>
        {hubs.map((hub) => (
          <div key={hub.id} style={style}>
            <div>{hub.name} </div>
            <div>Subscribers: {hub.subscribers}</div>
            <button onClick={() => handleSubscribe(hub)}>Subscribe</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllHubs;
