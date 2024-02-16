import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../reducers/userReducer';
import '../css/navigation.css';

const Navigation = () => {
  const loggedUser = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedCodeCollectorAppUser');
    dispatch(removeUser(null));
    navigate('/hubs');
  };

  return (
    <div className='navigation-parent-container'>
      <div>{'<Code Collector />'}</div>
      <Link className='nav-link' to='/hubs'>
        Hubs
      </Link>
      {!loggedUser && (
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      )}
      {loggedUser && (
        <span>
          <Link to={`/profile/${loggedUser.username}`}>
            {loggedUser.username}
          </Link>{' '}
          <button onClick={handleLogout}>Logout</button>
        </span>
      )}
    </div>
  );
};

export default Navigation;
