import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import loginService from '../services/login';
import { addUser } from '../reducers/userReducer';
import '../css/registerForm.css';
import '../css/loginForm.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const loggedUser = await loginService.login({ username, password });
    dispatch(addUser(loggedUser));
    window.localStorage.setItem(
      'loggedCodeCollectorAppUser',
      JSON.stringify(loggedUser)
    );
    setName('');
    setUsername('');
    setPassword('');
    navigate('/hubs');
  };

  return (
    <div className='register-form-parent-container'>
      <div className='login-form-sub-container'>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className='name-container'>
            <div>
              <label htmlFor='register-name'>Name </label>
            </div>
            <input
              type='text'
              id='register-name'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className='username-container'>
            <div>
              <label htmlFor='register-username'>Username </label>
            </div>
            <input
              type='text'
              id='register-username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className='password-container'>
            <div>
              <label htmlFor='register-password'> Password </label>
            </div>
            <input
              type='password'
              id='register-password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className='register-button' type='submit'>
            Register
          </button>
          <Link to='/login'>
            <button className='return-to-login-button'>Back</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
