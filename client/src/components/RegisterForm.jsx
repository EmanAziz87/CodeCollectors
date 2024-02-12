import { useState } from 'react';
import { useDispatch } from 'react-redux';
import userService from '../services/user';
import loginService from '../services/login';
import { addUser } from '../reducers/userReducer';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleRegister = async (event) => {
    event.preventDefault();
    const createdUser = await userService.createUser({
      name,
      username,
      password,
    });
    const loggedUser = await loginService.login({ username, password });
    dispatch(addUser(loggedUser));
    window.localStorage.setItem(
      'loggedCodeCollectorAppUser',
      JSON.stringify(loggedUser)
    );
    setName('');
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor='register-name'>Name: </label>
          <input
            type='text'
            id='register-name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='register-username'>Username: </label>
          <input
            type='text'
            id='register-username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='register-password'> Password: </label>
          <input
            type='password'
            id='register-password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
