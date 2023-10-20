import { Link } from 'react-router-dom';
import s from './login.module.css';
import { InputForm } from '@components/InputForm';

export const LogIn = () => {

  return (
    <div className={s.login__container}>
      <div className={s.login__box}>
        <p className={s.login__box__title}>Login</p>
        <form className={s.formLogin__container}>
          <InputForm
            type='Email'
            placeholder='Email'
          />
          <InputForm
            type='password'
            placeholder='Password'
          />
          <button type='submit' className={s.login__box__buttonSubmit}>
            Login
          </button>
        </form>
        <div className={s.login__box__moreInfo__container}>
          <p className={s.login__box__moreInfo}>
            Forgot{' '}
            {
              <Link to={''} className={s.login__box__moreInfo__featuredLink}>
                Password
              </Link>
            }
            ?
          </p>
          <p className={s.login__box__moreInfo}>
            Don't have an account?{' '}
            <Link to={''} className={s.login__box__moreInfo__featuredLink}>
              Sing up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
