import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useUser} from '../hooks/ApiHooks';

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const {getUser} = useUser();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const userData = await getUser(localStorage.getItem('token'));
      console.log(userData);
      setLoggedIn(true);
      navigate('/home');
    } catch (err) {
      setLoggedIn(false);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(loggedIn);

  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/profile'}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
