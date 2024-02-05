import { useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navigation from './components/Navigation';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const loggedUser = useSelector(({ user }) => user);
  console.log('CURRENT LOGGED IN USER:', loggedUser);
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
