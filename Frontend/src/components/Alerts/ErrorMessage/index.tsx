import { FC } from 'react';
import { errorIcon } from '@assets/icon';

import styles from './ErrorMessage.module.css';

interface Props {
  message: string;
}
export const ErrorMessage: FC<Props> = ({ message }) => {
  return (
    <div className={styles['error-message__container']}>
      <img
        src={errorIcon}
        alt='Error icon'
        className={styles['error-message__container__icon']}
      />
      <p className={styles['error-message__container__message']}>{message}</p>
    </div>
  );
};
