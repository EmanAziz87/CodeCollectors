import { Link, useNavigate } from 'react-router-dom';
import Snippets from './Snippets';
import Toggle from './Toggle';
import { useSelector, useDispatch } from 'react-redux';
import { initializePosts } from '../reducers/postsReducer';
import { useEffect } from 'react';
import { initializeHubs } from '../reducers/hubsReducer';
import { deletePost } from '../reducers/postsReducer';
import postService from '../services/posts';
import userService from '../services/user';
import { deleteAccount } from '../reducers/userReducer';
import Icons from '../icon/index';
import '../css/profile.css';

const Profile = ({ user }) => {
  const posts = useSelector(({ posts }) => posts);
  const hubs = useSelector(({ hubs }) => hubs);
  const loggedUser = useSelector(({ user }) => user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializePosts());
  }, []);

  useEffect(() => {
    dispatch(initializeHubs());
  }, []);

  const handleDeletePost = (postId) => {
    postService.setToken(loggedUser);
    dispatch(deletePost(postId));
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        'Are you sure you would like to delete your account?...there is no going back friend'
      )
    )
      userService.setToken(loggedUser);
    dispatch(deleteAccount(loggedUser.id));
    window.localStorage.removeItem('loggedCodeCollectorAppUser');
    alert('safe travels...');
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className='profile-parent-container'>
      <h1 className='profile-title'>{user.username}</h1>
      <div>
        <h3>Your Subscribed Hubs</h3>
        <div className='profile-subscribed-hubs-container'>
          {user.subscribedHubs.map((hub) => (
            <div className='profile-hub-logo-container' key={hub}>
              <img
                width='50px'
                height='50px'
                src={Icons[`${hub}`]}
                alt={`${hub} icon`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='snippet-form-container'>
        <Link to='/snippet_form'>
          <button className='snippet-form-button'>Add Snippet</button>
        </Link>
      </div>
      <div className='posts-snippets-profile-container'>
        <div className='posts-profile-container'>
          <h2>All Your Posts</h2>
          <Toggle buttonLabel='Show Posts'>
            <div>
              {posts
                .filter((post) => post.author === loggedUser.username)
                .map((post) => {
                  const hub = hubs.find((h) => h.id === post.hubId);
                  return (
                    <div key={post.id} className='post-container'>
                      <Link
                        className='post-link'
                        to={`/posts/${post.id}`}
                        state={{
                          post,
                          hub,
                          prevPath: `/profile/${loggedUser.username}`,
                        }}
                      >
                        <div className='post-link-container'>{post.title}</div>
                      </Link>
                      <div className='delete-post-button-container'>
                        {loggedUser.username === post.author && (
                          <button
                            className='delete-post-button'
                            onClick={() => handleDeletePost(post.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </Toggle>
        </div>
        <div className='snippets-profile-container'>
          <h2>All Your Snippets</h2>
          <Toggle buttonLabel='Show Code Snippets'>
            <Snippets />
          </Toggle>
        </div>
      </div>
      <div className='delete-account-container'>
        <button className='delete-account-button' onClick={handleDeleteAccount}>
          DELETE ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default Profile;
