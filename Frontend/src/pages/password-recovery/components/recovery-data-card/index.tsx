import { FC, FormEvent } from 'react';
import { InputForm } from '@components/InputForm';
import { PasswordRecovery } from 'interfaces/pages/PasswordRecovery';

import s from './RecoveryDataCard.module.css';

export const RecoveryDataCard: FC<PasswordRecovery> = ({ onNext }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  return (
    <>
      <form className={s.recoveryDataCard__container} onSubmit={handleSubmit}>
        <div className={s.recoveryDataCard__container__form__input__box}>
          <label htmlFor=''>Enter you username</label>
          <InputForm type='text' placeholder='Username' />
        </div>
        <div>
          <label htmlFor=''>Enter your e-mail to receive the code</label>
          <InputForm type='email' placeholder='G-mial' />
        </div>
        <button
          type='submit'
          className={s.recoveryDataCard__container__form__button}
        >
          Send code
        </button>
      </form>
    </>
  );
};
