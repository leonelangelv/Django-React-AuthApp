import { checkAnimateIcon } from '@assets/icon';

import s from './PasswordSavedCard.module.css';

export const PasswordSavedCard = () => {
  return (
    <div className={s.PasswordSavedCard__container}>
      <p>Password Saved</p>
      <img
        src={checkAnimateIcon}
        alt='check animated'
        className={s.PasswordSavedCard__container__img}
      />
    </div>
  );
};
