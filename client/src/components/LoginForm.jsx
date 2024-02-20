import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../css/loginForm.css';

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
      navigate('/hubs');
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
    <div className='login-form-container'>
      <div className='login-form-sub-container'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='username-container'>
            <div>
              <label htmlFor='login-username'>Username</label>
            </div>
            <input
              type='text'
              id='login-username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className='password-container'>
            <div>
              <label htmlFor='login-password'> Password</label>
            </div>
            <input
              type='password'
              id='login-password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className='login-button' type='submit'>
            Login
          </button>
        </form>
        <div>
          <div>Don't have an account? Register Here!</div>
          <Link to='/register' className='register-link'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
