import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navigation from './components/Navigation';
import AllHubs from './components/AllHubs';
import Profile from './components/Profile';
import Hub from './components/Hub';
import { autoReLogin } from './reducers/userReducer';
import SnippetForm from './components/SnippetForm';
import Post from './components/Post';
import EditPostForm from './components/EditPostForm';
import EditSnippetForm from './components/EditSnippetForm';
import './css/app.css';

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

      dispatch(autoReLogin(loggedUser));
    }
  }, []);

  console.log('CURRENT LOGGED IN USER:', loggedUser);
  return (
    <div className='app-container'>
      <Navigation />
      <Routes className='routes-container'>
        <Route path='/snippet_form' element={<SnippetForm />} />
        <Route path='/editPostForm' element={<EditPostForm />} />
        <Route path='/snippetEditForm' element={<EditSnippetForm />} />
        <Route
          path='/profile/:username'
          element={<Profile user={loggedUser} />}
        />
        <Route path='/hubs' element={<AllHubs />} />
        <Route path='/hubs/:id' element={<Hub />} />
        <Route path='/posts/:postId' element={<Post />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
