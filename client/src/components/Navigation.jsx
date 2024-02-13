import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../reducers/userReducer';

const style = {
  paddingRight: '5px',
};

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
    <div>
      <Link style={style} to='/hubs'>
        Hubs
      </Link>
      {!loggedUser && (
        <Link style={style} to='/login'>
          Login
        </Link>
      )}
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
