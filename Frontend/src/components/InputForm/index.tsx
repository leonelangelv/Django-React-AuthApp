import { FC, InputHTMLAttributes } from 'react';
import s from './InputForm.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder: string;
  hasError?: boolean;
  errorMessage?: string;
}

export const InputForm: FC<Props> = ({
  type,
  placeholder,
  hasError = false,
  errorMessage,
  ...props
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`${s.formLogin__container__input} ${
          hasError ? s['has-error'] : s['not-error']
          }`}
        {...props}
      />
      {hasError && (
        <div className={s.formLogin__container__errorBox}>{errorMessage}</div>
      )}
    </>
  );
};