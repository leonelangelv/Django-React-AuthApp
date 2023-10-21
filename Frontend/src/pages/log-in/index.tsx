import { Link } from 'react-router-dom';
import s from './login.module.css';
import { InputForm } from '@components/InputForm';

export const Login = () => {
  return (
    <div className={s.login__container}>
      <div className={s.login__box}>
        <p className={s.login__box__title}>Login</p>
        <form className={s.formLogin__container}>
          <InputForm type='text' placeholder='Username' />
          <InputForm type='password' placeholder='Password' />
          <button type='submit' className={s.login__box__buttonSubmit}>
            Login
          </button>
        </form>
        <div className={s.login__box__moreInfo__container}>
          <p className={s.login__box__moreInfo}>
            Forgot{' '}
            {
              <Link
                to={'/password-recovery'}
                className={s.login__box__moreInfo__featuredLink}
              >
                Password
              </Link>
            }
            ?
          </p>
          <p className={s.login__box__moreInfo}>
            Don't have an account?{' '}
            <Link
              to={'/signup'}
              className={s.login__box__moreInfo__featuredLink}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
