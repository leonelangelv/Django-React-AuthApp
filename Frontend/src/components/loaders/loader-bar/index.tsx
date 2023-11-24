import styles from './LoaderBar.module.css';

export const LoaderBar = ({ message }: { message: string }) => {
  return (
    <div className={styles['loader-bar__container']}>
      <div className={styles['loader-bar__container__bar']}>
        <h1 className={styles['loader-bar__container__bar__msg']}>
          {message}...
        </h1>
        <div className={styles['loader-bar__container__bar__progress']}></div>
      </div>
    </div>
  );
};
