import React from 'react';
import useForm from '../hooks/FormHooks';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = (props) => {
  const alkuarvot = {
    username: '',
    password: '',
    email: '',
    full_name: '',
  };

  const {postUser, getUsername} = useUser();

  const doRegister = async () => {
    console.log('doRegister');
    try {
      const checkUser = await getUsername(inputs.username);
      if (checkUser) {
        const userData = await postUser(inputs);
        console.log(userData);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    alkuarvot
  );
  console.log(inputs);

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="username"
        name="username"
        onChange={handleInputChange}
        value={inputs.username}
      />
      <input
        placeholder="password"
        name="password"
        type="password"
        onChange={handleInputChange}
        value={inputs.password}
      />
      <input
        placeholder="email"
        name="email"
        type="email"
        onChange={handleInputChange}
        value={inputs.email}
      />
      <input
        placeholder="full name"
        name="full_name"
        onChange={handleInputChange}
        value={inputs.full_name}
      />
      <input type="submit" value="register" />
    </form>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
