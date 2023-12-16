import { FC } from 'react';
import { useFormik } from 'formik';
import { InputForm } from '@components/InputForm';
import { formValidation } from '@helpers/formsValidations';
import { PasswordRecovery } from 'interfaces/pages/PasswordRecovery';
import { sendRecoveryDataRequest } from '@services/password-recovery/sendRecoveryDataRequest';
import { ErrorMessage } from '@components/Alerts/ErrorMessage';

import styles from './RecoveryDataCard.module.css';

export interface SendRecoveryData {
  username: string;
  email: string;
}

const initialValues = {
  username: '',
  email: ''
};

export const RecoveryDataCard: FC<PasswordRecovery> = ({
  onNext,
  setUsername
}) => {
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
        const res = await sendRecoveryDataRequest(values);
        if (res.ok) {
          setUsername?.(values.username);
          resetForm();
          onNext();
        } else {
          setStatus(res.message);
        }
      } catch (error) {
        console.error('Error during send recovery data: ', error);
      }
    },
    validationSchema: formValidation.omit(['password', 'repetPassword'])
  });

  return (
    <form
      className={styles['recovery-data-card__container']}
      onSubmit={handleSubmit}
    >
      {status && <ErrorMessage message={status} />}
      <div
        className={styles['recovery-data-card__container__form__input__box']}
      >
        <label htmlFor=''>Enter you username</label>
        <InputForm
          type='text'
          placeholder='Username'
          hasError={touched.username && !!errors.username}
          errorMessage={errors.username}
          {...getFieldProps('username')}
        />
      </div>
      <div>
        <label htmlFor=''>Enter your e-mail to receive the code</label>
        <InputForm
          type='email'
          placeholder='Emial'
          hasError={touched.email && !!errors.email}
          errorMessage={errors.email}
          {...getFieldProps('email')}
        />
      </div>
      <button
        type='submit'
        className={styles['recovery-data-card__container__form__button']}
      >
        Send code
      </button>
    </form>
  );
};
