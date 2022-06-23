import React from 'react';

const SignInForm = () => {
  return (
    <form action="">
      <input type="text" placeholder="login" required />
      <input type="text" placeholder="password" />
      <button type="submit">Sign In</button>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignInForm;
