import s from './HeaderUserProfile.module.css';

export const HeaderUserProfile = () => {
  return (
    <header className={s.userProfile__contianer__header}>
      <img
        src='https://th.bing.com/th/id/OIP.qDwy8_W3I3nDq0A89Mmk5QHaHa?w=191&h=191&c=7&r=0&o=5&pid=1.7'
        alt='Don Pepito'
        className={s.userProfile__contianer__header__userImg}
      />
      <p className={s.userProfile__contianer__header__userName}>Leonel Angel</p>
      <button className={s.userProfile__contianer__header__signOut}>
        Sign out
      </button>
    </header>
  );
};
