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

  const style = {
    transition: 'background-color 0.1s ease-in',
  };

  return (
    <div className='navigation-parent-container'>
      <Link className='nav-logo-link' to='/hubs'>
        <div className='navigation-logo'>{'<Code Collector />'}</div>
      </Link>
      <Link style={style} className='nav-link' to='/hubs'>
        Hubs
      </Link>

      {!loggedUser && (
        <Link style={style} className='nav-link' to='/login'>
          Login
        </Link>
      )}
      {loggedUser && (
        <div className='profile-logout-container'>
          <Link
            style={style}
            className='nav-link'
            to={`/profile/${loggedUser.username}`}
          >
            Profile
          </Link>
          <button className='logout-button' onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
