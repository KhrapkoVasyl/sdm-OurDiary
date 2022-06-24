import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

const SignUpForm = () => {
  const navigate = useNavigate();

  const onSignInClick = () => {
    navigate(ROUTES.SIGN_IN);
  };

  return (
    <form>
      <input type="text" placeholder="login" required />
      <input type="text" placeholder="password" required />
      <button type="submit">Sign Up</button>
      <button type="button" onClick={onSignInClick}>
        Sign In
      </button>
    </form>
  );
};

export default SignUpForm;
