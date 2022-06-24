import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { useForm } from 'react-hook-form';
import { signUp } from 'features/auth/auth.thunk';
import { selectAuthError, useAuthActions } from 'features/auth/authSlice';
import { selectIsLoading } from 'features/global/globalSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetError } = useAuthActions();
  const onSignInClick = () => {
    navigate(ROUTES.SIGN_IN);
  };
  const authErrors = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(signUp(data));
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
        <button type="submit">Sign Up</button>
        <button type="button" onClick={onSignInClick}>
          Sign In
        </button>
      </form>
      {errors.password && <p>Password is required</p>}
      {errors.login && <p>Login is required</p>}
      {authErrors && <p>{authErrors}</p>}
    </>
  );
};

export default SignUpForm;
