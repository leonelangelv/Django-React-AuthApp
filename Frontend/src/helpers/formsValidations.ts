import * as Yup from 'yup';

const NAME_LENGTH = 15;
const MIN_PASSWORD = 8;

const ERRORS_LOGIN = {
  REQUIRED: 'Este campo es obligatorio',
  NAME: `El nombre debe tener menos de ${NAME_LENGTH} caracteres`,
  PASSWORD: {
    MIN: `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres`,
    LOWERCASE: 'La contraseña debe tener al menos una minúscula',
    UPPERCASE: 'La contraseña debe tener al menos una mayúscula',
    NUMBER: 'La contraseña debe tener al menos un número',
    SPECIAL: 'La contraseña debe tener al menos un caracter especial',
    MATCH: 'Las contraseñas deben coincidir'
  }
};

export const LoginValidation = Yup.object({
  username: Yup.string()
    .required(ERRORS_LOGIN.REQUIRED)
    .max(NAME_LENGTH, ERRORS_LOGIN.NAME),
  password: Yup.string()
    .required(ERRORS_LOGIN.REQUIRED)
    .min(MIN_PASSWORD, ERRORS_LOGIN.PASSWORD.MIN)
    .matches(/^(?=.*[a-z])/, ERRORS_LOGIN.PASSWORD.LOWERCASE)
    .matches(/^(?=.*[A-Z])/, ERRORS_LOGIN.PASSWORD.UPPERCASE)
    .matches(/^(?=.*\d)/, ERRORS_LOGIN.PASSWORD.NUMBER)
    .matches(
      /^(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?])/,
      ERRORS_LOGIN.PASSWORD.SPECIAL
    )
});
