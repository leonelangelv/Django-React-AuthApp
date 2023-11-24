import { FC } from 'react';
import { PasswordRecovery } from 'interfaces/pages/PasswordRecovery';
import { useFormik } from 'formik';
import { InputForm } from '@components/InputForm';
import { formValidation } from '@helpers/formsValidations';

import s from './NewPasswordCard.module.css';

const initialValues = {
  password: '',
  repetPassword: ''
};

export const NewPasswordCard: FC<PasswordRecovery> = ({ onNext }) => {
  const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik(
    {
      initialValues,
      onSubmit: () => {
        onNext();
        resetForm();
      },
      validationSchema: formValidation.omit(['email', 'username'])
    }
  );

  return (
    <form className={s.NewPasswordCard__container} onSubmit={handleSubmit}>
      <h4>Enter the new password</h4>
      <div className={s.NewPasswordCard__container__form__input__box}>
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
      <div className={s.NewPasswordCard__container__form__input__box}>
        <InputForm
          type='text'
          placeholder='Repet password'
          autoComplete='off'
          autoSave='off'
          hasError={touched.repetPassword && !!errors.repetPassword}
          errorMessage={errors.repetPassword}
          {...getFieldProps('repetPassword')}
        />
      </div>
      <button
        type='submit'
        className={s.NewPasswordCard__container__form__button}
      >
        Confirm
      </button>
    </form>
  );
};
