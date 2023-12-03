import { useContext } from 'react';
import { UserContext } from '@contexts/UserContext';
import { ErrorMessage } from '@components/Alerts/ErrorMessage';
import { Link } from 'react-router-dom';
import { InputForm } from '@components/InputForm';
import { useFormik } from 'formik';
import { formValidation } from '@helpers/formsValidations';
import { signupRequest } from '@services/signupRequest';

import styles from './signup.module.css';

const initialValues = {
  name: '',
  lastname: '',
  username: '',
  password: '',
  repetPassword: ''
};

export const Signup = () => {
  const { setAuthenticated, updateUser } = useContext(UserContext);

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
      const userData = { user: values };
      try {
        const { message, ok, ...res } = await signupRequest(userData);

        if (ok) {
          setAuthenticated(true);
          updateUser(res);
          resetForm();
        } else {
          setStatus(message);
        }
      } catch (error) {
        console.error('Error al enviar la solicitud de registro:', error);
      }
    },
    validationSchema: formValidation.omit(['email'])
  });

  return (
    <div className={styles.signup__container}>
      <div className={styles.signup__box}>
        <p className={styles.signup__box__title}>Sign up</p>
        {status && <ErrorMessage message={status} />}
        <form className={styles.formsignup__container} onSubmit={handleSubmit}>
          <InputForm
            type='text'
            placeholder='Name'
            hasError={touched.name && !!errors.name}
            errorMessage={errors.name}
            {...getFieldProps('name')}
          />
          <InputForm
            type='text'
            placeholder='Lastname'
            hasError={touched.lastname && !!errors.lastname}
            errorMessage={errors.lastname}
            {...getFieldProps('lastname')}
          />
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
          <button type='submit' className={styles.signup__box__buttonSubmit}>
            Sign up
          </button>
        </form>
        <div className={styles.signup__box__moreInfo__container}>
          <p className={styles.signup__box__moreInfo}>
            do have an account?{' '}
            <Link
              to={'/login'}
              className={styles.signup__box__moreInfo__featuredLink}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
