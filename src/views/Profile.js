import {useContext, useState, useEffect} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';

const Profile = () => {
  const [user] = useContext(MediaContext);
  const [avatar, setAvatar] = useState({
    filename: 'https://placekitten.com/320',
  });
  const {getTag} = useTag();

  const fetchAvatar = async (user) => {
    if (user) {
      const avatars = await getTag('avatar_' + user.user_id);
      const ava = avatars.pop();
      ava.filename = mediaUrl + ava.filename;
      setAvatar(ava);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [user]);

  return (
    <>
      <h1>Profile</h1>
      {user && (
        <ul>
          <li>
            <img src={avatar.filename} alt={`${user.username}'s profilepic`} />
          </li>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>{user.full_name}</li>
        </ul>
      )}
    </>
  );
};

export default Profile;
