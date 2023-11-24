import { FC } from 'react';
import { useFormik } from 'formik';
import { InputForm } from '@components/InputForm';
import { formValidation } from '@helpers/formsValidations';
import { PasswordRecovery } from 'interfaces/pages/PasswordRecovery';

import styles from './RecoveryDataCard.module.css';

const initialValues = {
  username: '',
  email: ''
};

export const RecoveryDataCard: FC<PasswordRecovery> = ({ onNext }) => {
  const { handleSubmit, touched, errors, getFieldProps, resetForm } = useFormik(
    {
      initialValues,
      onSubmit: () => {
        resetForm();
        onNext();
      },
      validationSchema: formValidation.omit(['password', 'repetPassword'])
    }
  );

  return (
    <form
      className={styles['recovery-data-card__container']}
      onSubmit={handleSubmit}
    >
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
