import { useLocation } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from './PostForm';
import Posts from './Posts';
import { subscribeToHub, initializeHubs } from '../reducers/hubsReducer';
import hubService from '../services/hubs';
import Toggle from './Toggle';
import Icons from '../icon/index';
import '../css/hub.css';

const Hub = () => {
  const { state } = useLocation();
  const [subText, setSubText] = useState('');
  const dispatch = useDispatch();
  const hubs = useSelector(({ hubs }) => hubs);

  const postFormRef = useRef();
  const loggedUser = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(initializeHubs());
  }, []);

  const handleSubText = (enter) => {
    if (enter) {
      setSubText('Unsub');
    } else {
      setSubText('Subscribed');
    }
  };

  const handleSubscribe = (hub) => {
    hubService.setToken(loggedUser);
    dispatch(subscribeToHub(hub));
  };

  return (
    <div className='hub-parent-container'>
      {hubs
        .filter((hub) => hub.name === state.hub.name)
        .map((hub) => (
          <div key={hub.id} className='hub-container'>
            <div className='language-icon-sub-container'>
              <img
                className='language-icon'
                src={Icons[hub.name]}
                alt={`${hub.name} icon`}
              />
            </div>
            <div>
              <h2>{hub.name}</h2>
              <h4>
                Subscribers: <div>{hub.subscribers}</div>
              </h4>
            </div>
            {loggedUser && (
              <button
                className='subscribe-hub-button'
                onClick={() => handleSubscribe(hub)}
                onMouseOver={() => handleSubText(true)}
                onMouseLeave={() => handleSubText()}
              >
                {loggedUser.subscribedHubs.find(
                  (userHub) => userHub === hub.name
                )
                  ? subText
                  : 'Subscribe'}
              </button>
            )}
            <div className='post-form-container'>
              <Toggle buttonLabel={'Create Post'} ref={postFormRef}>
                <PostForm hub={hub} postFormRef={postFormRef} />
              </Toggle>
            </div>
            <Posts hub={hub} />
          </div>
        ))}
    </div>
  );
};

export default Hub;
