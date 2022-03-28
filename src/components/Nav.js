import React, {useEffect, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useUser} from '../hooks/ApiHooks';
import {MediaContext} from '../contexts/MediaContext';

const Nav = () => {
  const [user, setUser] = useContext(MediaContext);
  const {getUser} = useUser();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const userData = await getUser(localStorage.getItem('token'));
      console.log(userData);
      setUser(userData);
    } catch (err) {
      setUser(null);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user);

  return (
    <nav>
      <ul>
        <li>
          <Link to={'/home'}>Home</Link>
        </li>
        {user && (
          <>
            <li>
              <Link to={'/profile'}>Profile</Link>
            </li>
            <li>
              <Link to={'/logout'}>Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
