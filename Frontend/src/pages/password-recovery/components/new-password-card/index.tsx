import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordRecovery } from 'interfaces/pages/PasswordRecovery';
import { useFormik } from 'formik';
import { InputForm } from '@components/InputForm';
import { formValidation } from '@helpers/formsValidations';
import { resetPasswordRequest } from '@services/password-recovery/resetPasswordRequest';
import { ErrorMessage } from '@components/Alerts/ErrorMessage';

import styles from './NewPasswordCard.module.css';

const initialValues = {
  password: '',
  repetPassword: ''
};

export const NewPasswordCard: FC<PasswordRecovery> = ({ onNext, username }) => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    errors,
    touched,
    getFieldProps,
    resetForm,
    status,
    setStatus
  } = useFormik({
    initialValues: {
      username,
      ...initialValues
    },
    onSubmit: async (values) => {
      const finalValues = {
        repeatPassword: values.repetPassword,
        ...values
      };
      const res = await resetPasswordRequest(finalValues);
      if (res.ok) {
        onNext();
        resetForm();

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setStatus(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
    validationSchema: formValidation.omit(['email', 'username'])
  });

  return (
    <form
      className={styles['new-password-card__container']}
      onSubmit={handleSubmit}
    >
      {status && <ErrorMessage message={status} />}
      <h4>Enter the new password</h4>
      <div className={styles['new-password-card__container__form__input__box']}>
        <InputForm
          type='text'
          placeholder='Password'
          autoComplete='off'
          autoSave='off'
          hasError={touched.password && !!errors.password}
          errorMessage={errors.password}
          {...getFieldProps('password')}
        />
      </div>
      <div className={styles['new-password-card__container__form__input__box']}>
        <InputForm
          type='text'
          placeholder='Repeat password'
          autoComplete='off'
          autoSave='off'
          hasError={touched.repetPassword && !!errors.repetPassword}
          errorMessage={errors.repetPassword}
          {...getFieldProps('repetPassword')}
        />
      </div>
      <button
        type='submit'
        className={styles['new-password-card__container__form__button']}
      >
        Confirm
      </button>
    </form>
  );
};
