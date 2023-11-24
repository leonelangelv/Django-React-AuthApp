import { FC, InputHTMLAttributes } from 'react';
import { InputErrorMessage } from './components/input-message-error';

import styles from './InputForm.module.css';

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
  errorMessage = '',
  ...props
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`${styles['form-login__container__input']} ${
          hasError ? styles['has-error'] : styles['not-error']
        }`}
        {...props}
      />
      {hasError && <InputErrorMessage message={errorMessage} />}
    </>
  );
};
