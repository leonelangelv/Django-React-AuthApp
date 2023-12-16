import { FC } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { PasswordRecovery } from 'interfaces/pages/PasswordRecovery';
import { InputForm } from '@components/InputForm';
import { checkRecoveryCodeRequest } from '@services/password-recovery/checkRecoveryCodeRequest';
import { ErrorMessage } from '@components/Alerts/ErrorMessage';

import styles from './EnterCodeCard.module.css';

const validationSchema = Yup.object({
  code: Yup.string()
    .required('Campo requerido')
    .matches(/^\d{6}$/, 'Debe contener exactamente 6 números')
});

export interface CheckRecoveryData {
  username: string;
  code: string;
}

export const EnterCodeCard: FC<PasswordRecovery> = ({ onNext, username }) => {
  const { handleSubmit, getFieldProps, errors, touched, status, setStatus } =
    useFormik({
      initialValues: {
        username,
        code: ''
      },
      onSubmit: async (values) => {
        try {
          const res = await checkRecoveryCodeRequest(values);
          if (res.ok) {
            onNext();
          } else {
            setStatus(res.message);
          }
        } catch (error) {
          console.error('Error during check recovery code: ', error);
        }
      },
      validationSchema
    });

  return (
    <form
      className={styles['enter-code-card__container']}
      onSubmit={handleSubmit}
    >
      {status && <ErrorMessage message={status} />}
      <p>{username}</p>
      <div className={styles['enter-code-card__container__form__input__box']}>
        <label htmlFor=''>Enter the code</label>
        <InputForm
          type='text'
          placeholder='Code'
          hasError={touched.code && !!errors.code}
          errorMessage={errors.code}
          {...getFieldProps('code')}
        />
      </div>
      <button
        type='submit'
        className={styles['enter-code-card__container__form__button']}
      >
        Send code
      </button>
    </form>
  );
};
