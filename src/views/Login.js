import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {useState} from 'react';
import {Button} from '@mui/material';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      {toggle ? <LoginForm /> : <RegisterForm setToggle={setToggle} />}
      {toggle ? `Don't have account?` : `Already have an account?`}
      <Button
        fullWidth
        color="primary"
        variant="contained"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? 'Register' : 'Login'}
      </Button>
    </>
  );
};

export default Login;
