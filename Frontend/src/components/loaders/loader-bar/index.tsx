import s from './LoaderBar.module.css';

export const LoaderBar = ({ message }: { message: string }) => {
  return (
    <div className={s.loaderBar__container}>
      <div className={s.loaderBar__container__bar}>
        <h1>{message}...</h1>
        <div className={s.loaderBar__container__bar__progress}></div>
      </div>
    </div>
  );
};
