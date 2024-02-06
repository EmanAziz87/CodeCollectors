import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeHubs } from '../reducers/hubsReducer';

const AllHubs = () => {
  const dispatch = useDispatch();
  const hubs = useSelector(({ hubs }) => hubs);

  useEffect(() => {
    dispatch(initializeHubs());
  }, []);

  return (
    <div>
      <h2>All Hubs</h2>{' '}
      <div>
        {hubs.map((hub) => (
          <div key={hub.id}>
            <div>{hub.name} </div>
            <div>Subscribers: {hub.subscribers}</div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllHubs;
