import { Link } from 'react-router-dom';
import s from './signup.module.css';
import { InputForm } from '@components/InputForm';

export const Signup  = () => {

  return (
    <div className={s.signup__container}>
      <div className={s.signup__box}>
        <p className={s.signup__box__title}>Sign up</p>
        <form className={s.formsignup__container}>
          <InputForm
            type='text'
            placeholder='Username'
          />
          <InputForm
            type='password'
            placeholder='Password'
          />
          <InputForm
            type='password'
            placeholder='Repeat password'
          />
          <button type='submit' className={s.signup__box__buttonSubmit}>
            Sign up
          </button>
        </form>
        <div className={s.signup__box__moreInfo__container}>
          <p className={s.signup__box__moreInfo}>
            have an account?{' '}
            <Link to={'/login'} className={s.signup__box__moreInfo__featuredLink}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
