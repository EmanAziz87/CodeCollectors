import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navigation from './components/Navigation';
import AllHubs from './components/AllHubs';
import Posts from './components/Posts';
import { addUser } from './reducers/userReducer';

function App() {
  const loggedUser = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem(
      'loggedCodeCollectorAppUser'
    );
    if (isLoggedIn) {
      const loggedUser = JSON.parse(
        window.localStorage.getItem('loggedCodeCollectorAppUser')
      );
      dispatch(addUser(loggedUser));
    }
  }, []);

  console.log('CURRENT LOGGED IN USER:', loggedUser);
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/hubs' element={<AllHubs />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
