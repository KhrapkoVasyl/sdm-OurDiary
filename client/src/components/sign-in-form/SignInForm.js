import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useForm } from 'react-hook-form';
import { signIn } from 'features/auth/auth.thunk';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthError } from 'features/auth/authSlice';
import { selectIsLoading } from 'features/global/globalSlice';
import { useAuthActions } from 'features/auth/authSlice';

const SignInForm = () => {
  const { resetError } = useAuthActions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSignUpClick = () => {
    navigate(ROUTES.SIGN_UP);
  };
  const authError = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(signIn(data));
  };

  useEffect(() => {
    return () => resetError();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="login"
          {...register('login', { required: true })}
        />
        <input
          type="text"
          placeholder="password"
          {...register('password', { required: true })}
        />
        <button type="submit">Sign In</button>
        <button type="button" onClick={onSignUpClick}>
          Sign Up
        </button>
      </form>
      {errors.password && <p>Password is required</p>}
      {errors.login && <p>Login is required</p>}
      {authError && <p>{authError}</p>}
    </>
  );
};

export default SignInForm;
