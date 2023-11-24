import { Link } from 'react-router-dom';
import { InputForm } from '@components/InputForm';
import { useFormik } from 'formik';
import { formValidation } from '@helpers/formsValidations';

import s from './signup.module.css';

const initialValues = {
  username: '',
  password: '',
  repetPassword: ''
};

export const Signup = () => {
  const { handleSubmit, touched, errors, getFieldProps, resetForm } = useFormik(
    {
      initialValues,
      onSubmit: () => {
        resetForm();
      },
      validationSchema: formValidation
    }
  );

  return (
    <div className={s.signup__container}>
      <div className={s.signup__box}>
        <p className={s.signup__box__title}>Sign up</p>
        <form className={s.formsignup__container} onSubmit={handleSubmit}>
          <InputForm
            type='text'
            placeholder='Username'
            hasError={touched.username && !!errors.username}
            errorMessage={errors.username}
            {...getFieldProps('username')}
          />
          <InputForm
            type='password'
            placeholder='Password'
            hasError={touched.password && !!errors.password}
            errorMessage={errors.password}
            {...getFieldProps('password')}
          />
          <InputForm
            type='password'
            placeholder='Repeat password'
            hasError={touched.repetPassword && !!errors.repetPassword}
            errorMessage={errors.repetPassword}
            {...getFieldProps('repetPassword')}
          />
          <button type='submit' className={s.signup__box__buttonSubmit}>
            Sign up
          </button>
        </form>
        <div className={s.signup__box__moreInfo__container}>
          <p className={s.signup__box__moreInfo}>
            have an account?{' '}
            <Link
              to={'/login'}
              className={s.signup__box__moreInfo__featuredLink}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
