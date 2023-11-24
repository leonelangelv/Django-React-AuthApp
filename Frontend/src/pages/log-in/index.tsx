import { Link } from 'react-router-dom';
import { InputForm } from '@components/InputForm';
import { useFormik } from 'formik';
import { formValidation } from '@helpers/formsValidations';
import { UserData } from 'interfaces/pages/log-in';

import styles from './login.module.css';

const initialValues: UserData = {
  username: '',
  password: ''
};

export const Login = () => {
  const { handleSubmit, touched, errors, getFieldProps, resetForm} = useFormik({
    initialValues,
    onSubmit: () => {
      resetForm()
    },
    validationSchema: formValidation
  });

  return (
    <div className={styles.login__container}>
      <div className={styles.login__box}>
        <p className={styles.login__box__title}>Login</p>
        <form className={styles.formLogin__container} onSubmit={handleSubmit}>
          <InputForm
            type='text'
            placeholder='Username'
            hasError={!!errors.username && touched.username}
            errorMessage={errors.username}
            {...getFieldProps('username')}
            />
          <InputForm
            type='password'
            placeholder='Password'
            hasError={!!errors.password && touched.password}
            errorMessage={errors.password}
            {...getFieldProps('password')}
          />
          <button type='submit' className={styles.login__box__buttonSubmit}>
            Login
          </button>
        </form>
        <div className={styles.login__box__moreInfo__container}>
          <p className={styles.login__box__moreInfo}>
            Forgot{' '}
            {
              <Link
                to={'/password-recovery'}
                className={styles.login__box__moreInfo__featuredLink}
              >
                Password
              </Link>
            }
            ?
          </p>
          <p className={styles.login__box__moreInfo}>
            Don't have an account?{' '}
            <Link
              to={'/signup'}
              className={styles.login__box__moreInfo__featuredLink}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
