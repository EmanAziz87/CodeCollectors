import { useState } from 'react';
import { useDispatch } from 'react-redux';

import loginService from '../services/login';
import { addUser } from '../reducers/userReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

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
    </div>
  );
};

export default LoginForm;
