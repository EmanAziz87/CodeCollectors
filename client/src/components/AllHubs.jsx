import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeHubs } from '../reducers/hubsReducer';
import Icons from '../icon/index';
import '../css/allHubs.css';

const AllHubs = () => {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const hubs = useSelector(({ hubs }) => hubs);

  useEffect(() => {
    dispatch(initializeHubs());
  }, []);

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
          <div className='hub-home-container' key={hub.id}>
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
                    <h3 className='language-icon-text'>{hub.name}</h3>
                  </div>
                </Link>{' '}
              </div>
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

export default AllHubs;
