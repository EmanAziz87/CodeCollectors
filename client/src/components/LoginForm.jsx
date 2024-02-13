import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import loginService from '../services/login';
import { addUser } from '../reducers/userReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loggedUser = useSelector(({ user }) => user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser) {
      navigate('/');
    }
  }, [loggedUser]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const loggedUser = await loginService.login({ username, password });

    window.localStorage.setItem(
      'loggedCodeCollectorAppUser',
      JSON.stringify(loggedUser)
    );

    dispatch(addUser(loggedUser));

    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='login-username'>Username: </label>
          <input
            type='text'
            id='login-username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='login-password'> Password: </label>
          <input
            type='password'
            id='login-password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <div>
        <div>Don't have an account? Register Here!</div>
        <Link to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
