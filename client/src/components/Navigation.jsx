import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </div>
  );
};

export default Navigation;
