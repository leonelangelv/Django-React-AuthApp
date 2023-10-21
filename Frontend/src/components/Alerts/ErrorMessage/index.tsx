import { FC } from 'react';
import { errorIcon } from '@assets/icon';

import s from './ErrorMessage.module.css';

interface Props {
  message: string;
}
export const ErrorMessage: FC<Props> = ({ message }) => {
  return (
    <div className={s.errorMessage__container}>
      <img
        src={errorIcon}
        alt='Error icon'
        className={s.errorMessage__container__icon}
      />
      <p className={s.errorMessage__container__message}>{message}</p>
    </div>
  );
};
