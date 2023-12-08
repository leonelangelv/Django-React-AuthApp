import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendLoginRequest } from '@services/sendLoginRequest';
import { InputForm } from '@components/InputForm';
import { useFormik } from 'formik';
import { formValidation } from '@helpers/formsValidations';
import { ErrorMessage } from '@components/Alerts/ErrorMessage';
import { UserContext } from '@contexts/UserContext';
import { UserData } from 'interfaces/pages/log-in';

import styles from './login.module.css';

const initialValues: UserData = {
  username: '',
  password: ''
};

export const Login = () => {
  const { updateUser, setAuthenticated } = useContext(UserContext)!;
  const navigate = useNavigate();

  const {
    handleSubmit,
    touched,
    errors,
    getFieldProps,
    resetForm,
    status,
    setStatus
  } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const { ok, message, ...res } = await sendLoginRequest(values);

        if (!ok) {
          setStatus(message || 'Error desconocido al iniciar sesión.');
        } else {
          setAuthenticated(true);
          navigate('/profile');
          updateUser(res);
          resetForm();
        }
      } catch (error) {
        console.error('Error sending login request:', error);
      }
    },
    validationSchema: formValidation.omit(['email', 'repetPassword'])
  });

  return (
    <div className={styles.login__container}>
      <div className={styles.login__box}>
        <p className={styles.login__box__title}>Login</p>
        {status && <ErrorMessage message={status} />}
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
