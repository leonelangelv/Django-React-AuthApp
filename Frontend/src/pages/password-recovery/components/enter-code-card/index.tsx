import { FC, FormEvent } from 'react';
import { PasswordRecovery } from 'interfaces/pages/PasswordRecovery';
import { InputForm } from '@components/InputForm';

import s from './EnterCodeCard.module.css';

export const EnterCodeCard: FC<PasswordRecovery> = ({ onNext }) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onNext();
  };

  return (
    <>
      <form className={s.EnterCodeCard__container} onSubmit={handleSubmit}>
        <div className={s.EnterCodeCard__container__form__input__box}>
          <label htmlFor=''>Enter the code</label>
          <InputForm type='text' placeholder='Code' />
        </div>
        <button
          type='submit'
          className={s.EnterCodeCard__container__form__button}
        >
          Send code
        </button>
      </form>
    </>
  );
};
