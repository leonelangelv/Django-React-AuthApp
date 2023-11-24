import { checkAnimateIcon } from '@assets/icon';

import styles from './PasswordSavedCard.module.css';

export const PasswordSavedCard = () => {
  return (
    <div className={styles['password-saved-card__container']}>
      <p>Password Saved</p>
      <img
        src={checkAnimateIcon}
        alt='check animated'
        className={styles['password-saved-card__container__img']}
      />
    </div>
  );
};
