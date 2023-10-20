import { errorIcon } from '@assets/icon';

import s from './ErrorMessage.module.css';

export const ErrorMessage = () => {
  return (
    <div className={s.errorMessage__container}>
      <img
        src={errorIcon}
        alt='Error icon'
        className={s.errorMessage__container__icon}
      />
      <p className={s.errorMessage__container__message}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
};
