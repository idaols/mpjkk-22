import React from 'react';
import useForm from '../hooks/FormHooks';

const RegisterForm = (props) => {
  const {inputs, handleInputChange} = useForm();
  console.log(inputs);

  return (
    <form>
      <input
        placeholder="username"
        name="username"
        onChange={handleInputChange}
      />
      <input
        placeholder="password"
        name="password"
        type="password"
        onChange={handleInputChange}
      />
      <input
        placeholder="email"
        name="email"
        type="email"
        onChange={handleInputChange}
      />
      <input
        placeholder="full name"
        name="full_name"
        onChange={handleInputChange}
      />
      <input type="submit" value="register" />
    </form>
  );
};

RegisterForm.propTypes = {};

export default RegisterForm;
