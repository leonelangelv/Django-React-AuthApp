import { FC, FormEvent } from 'react';
import { PasswordRecovery } from 'interfaces/pages/PasswordRecovery';
import { InputForm } from '@components/InputForm';

import s from './NewPasswordCard.module.css';

export const NewPasswordCard: FC<PasswordRecovery> = ({ onNext }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  return (
    <>
      <form className={s.NewPasswordCard__container} onSubmit={handleSubmit}>
        <h4>Enter the new password</h4>
        <div className={s.NewPasswordCard__container__form__input__box}>
          <InputForm type='text' placeholder='Password' />
        </div>
        <div className={s.NewPasswordCard__container__form__input__box}>
          <InputForm type='text' placeholder='Repet password' />
        </div>
        <button
          type='submit'
          className={s.NewPasswordCard__container__form__button}
        >
          Confirm
        </button>
      </form>
    </>
  );
};
