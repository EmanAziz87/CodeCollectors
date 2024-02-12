import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
            <div>
              <Link to={`/hubs/${hub.id}`} state={{ hub }}>
                {hub.name}
              </Link>{' '}
            </div>
            <div>Subscribers: {hub.subscribers}</div>
            {loggedUser && (
              <button onClick={() => handleSubscribe(hub)}>
                {loggedUser.subscribedHubs.find(
                  (userHub) => userHub === hub.name
                )
                  ? 'Unsubscribe'
                  : 'Subscribe'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* 
1. of the user thats logged in

2. look through that users list of subscribed hubs

3. look for whether the a hub in that list matches the name of the hub the unsub 
  button is linked to

4. return that hub if you found it from the previos step, other wise return undefined

5. evaluate the ternary condition

*/

export default AllHubs;
