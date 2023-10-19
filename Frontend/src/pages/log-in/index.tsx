import { Link } from 'react-router-dom';
import s from './login.module.css';

export const LogIn = () => {
  const error = true;

  return (
    <div className={s.login__container}>
      <div className={s.login__box}>
        <p className={s.login__box__title}>Login</p>
        <form className={s.formLogin__container}>
          <input
            type='email'
            placeholder='Email'
            className={`${s.formLogin__container__input} ${
              error ? s['has-error'] : s['not-error']
            }`}
          />
          {error && (
            <div className={s.formLogin__container__errorBox}>
              Error
            </div>
          )}
          <input
            type='text'
            placeholder='Password'
            className={`${s.formLogin__container__input} ${
              error ? s['has-error'] : s['not-error']
            }`}
          />
          {error && (
            <div className={s.formLogin__container__errorBox}>
              Error
            </div>
          )}
          <button type='submit' className={s.login__box__buttonSubmit}>
            Login
          </button>
        </form>
        <div className={s.login__box__moreInfo__container}>
          <p className={s.login__box__moreInfo}>
            Forgot{' '}
            {
              <Link
                to={'noce'}
                className={s.login__box__moreInfo__featuredLink}
              >
                Password
              </Link>
            }
            ?
          </p>
          <p className={s.login__box__moreInfo}>
            Don't have an account?{' '}
            <Link to={'noce'} className={s.login__box__moreInfo__featuredLink}>
              Sing up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
