import React from 'react';

const SignUpForm = () => {
  return (
    <form action="">
      <input type="text" placeholder="username" required />
      <input type="text" placeholder="login" required />
      <input type="text" placeholder="password" required />
      <button type="submit">Sign Up</button>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignUpForm;
