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
    <div>
      <h2>{user.username}</h2>
      <div>
        <h3>Your Subscribed Hubs:</h3>
        <ul>
          {user.subscribedHubs.map((hub) => (
            <li key={hub}>{hub}</li>
          ))}
        </ul>
      </div>
      <Link to='/snippet_form'>Snippet Form</Link>
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
                    to={`/posts/${post.id}`}
                    state={{
                      post,
                      hub,
                      prevPath: `/profile/${loggedUser.username}`,
                    }}
                  >
                    {post.title} by {post.author}
                  </Link>
                  {loggedUser.username === post.author && (
                    <button onClick={() => handleDeletePost(post.id)}>
                      Delete
                    </button>
                  )}
                  <br />
                </div>
              );
            })}
        </div>
      </Toggle>
      <h2>All Your Snippets</h2>
      <Toggle buttonLabel='Show Code Snippets'>
        <Snippets />
      </Toggle>
      <div>
        <button
          onClick={handleDeleteAccount}
          style={{ backgroundColor: 'red', marginTop: '20px' }}
        >
          DELETE ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default Profile;
