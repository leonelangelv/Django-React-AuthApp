import * as Yup from 'yup';

const NAME_LENGTH = 15;
const MIN_PASSWORD = 8;

const ERRORS = {
  REQUIRED: 'Este campo es obligatorio',
  NAME: `El nombre debe tener menos de ${NAME_LENGTH} caracteres`,
  PASSWORD: {
    MIN: `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres`,
    LOWERCASE: 'La contraseña debe tener al menos una minúscula',
    UPPERCASE: 'La contraseña debe tener al menos una mayúscula',
    NUMBER: 'La contraseña debe tener al menos un número',
    SPECIAL: 'La contraseña debe tener al menos un caracter especial',
    MATCH: 'Las contraseñas deben coincidir'
  },
  EMAIL: 'El email no es valido'
};

export const formValidation = Yup.object({
  username: Yup.string()
    .required(ERRORS.REQUIRED)
    .max(NAME_LENGTH, ERRORS.NAME),
  password: Yup.string()
    .required(ERRORS.REQUIRED)
    .min(MIN_PASSWORD, ERRORS.PASSWORD.MIN)
    .matches(/^(?=.*[a-z])/, ERRORS.PASSWORD.LOWERCASE)
    .matches(/^(?=.*[A-Z])/, ERRORS.PASSWORD.UPPERCASE)
    .matches(/^(?=.*\d)/, ERRORS.PASSWORD.NUMBER)
    .matches(
      /^(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?])/,
      ERRORS.PASSWORD.SPECIAL
    ),
  repetPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    .required(ERRORS.REQUIRED),
  email: Yup.string().required(ERRORS.REQUIRED).email(ERRORS.EMAIL)
});
