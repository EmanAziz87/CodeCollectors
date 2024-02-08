import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../reducers/userReducer';

const style = {
  paddingRight: '5px',
};

const Navigation = () => {
  const loggedUser = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedCodeCollectorAppUser');
    dispatch(removeUser(null));
  };

  return (
    <div>
      <Link style={style} to='/hubs'>
        Hubs
      </Link>
      <Link style={style} to='/login'>
        Login
      </Link>
      <Link style={style} to='/register'>
        Register
      </Link>
      {loggedUser && (
        <span style={style}>
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
