import { FC } from 'react';
import { useFormik } from 'formik';
import { PasswordRecovery } from 'interfaces/pages/PasswordRecovery';
import { InputForm } from '@components/InputForm';
import * as Yup from 'yup';

import styles from './EnterCodeCard.module.css';

const validationSchema = Yup.object({
  code: Yup.string()
    .required('Campo requerido')
    .matches(/^\d{6}$/, 'Debe contener exactamente 6 números')
});

export const EnterCodeCard: FC<PasswordRecovery> = ({ onNext }) => {
  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: { code: '' },
    onSubmit: () => {
      onNext();
    },
    validationSchema
  });

  return (
    <form
      className={styles['enter-code-card__container']}
      onSubmit={handleSubmit}
    >
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
