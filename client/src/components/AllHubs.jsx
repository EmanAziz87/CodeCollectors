import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeHubs, subscribeToHub } from '../reducers/hubsReducer';
import hubService from '../services/hubs';
import Icons from '../icon/index';
import '../css/allHubs.css';

const AllHubs = () => {
  const [filter, setFilter] = useState('');
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

  const filteredHubs = hubs.filter((hub) => {
    if (hub.name.toLowerCase().startsWith(filter.toLowerCase())) {
      return hub;
    }
  });

  const hubsToShow = filter ? filteredHubs : hubs;

  return (
    <div className='all-hubs-parent-container'>
      <h2 className='hub-container-title'>Discover Hubs</h2>{' '}
      <div className='all-hubs-container'>
        {hubsToShow.map((hub) => (
          <div className='hub-container' key={hub.id}>
            <div>
              <div>
                <Link
                  className='hub-link'
                  to={`/hubs/${hub.id}`}
                  state={{ hub }}
                >
                  <div className='language-icon-container'>
                    <img
                      className='language-icon'
                      src={Icons[`${hub.name}`]}
                      alt={`${hub.name} icon`}
                    />
                  </div>
                  <div>
                    <h3>{hub.name}</h3>
                  </div>
                </Link>{' '}
              </div>
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
          </div>
        ))}
      </div>
      <div className='hub-search-container'>
        <input
          id='hub-search-input'
          type='text'
          placeholder='Search Hubs'
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
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
