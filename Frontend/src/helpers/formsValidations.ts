import * as Yup from 'yup';

const NAME_LENGTH = 15;
const MIN_PASSWORD = 8;

const ERRORS = {
  USER: {
    NAME: 'El nombre solo debe contener letras',
    LASTNAME: 'El apellido solo debe contener letras'
  },
  REQUIRED: 'Este campo es obligatorio',
  USER_NAME: `El nombre debe tener menos de ${NAME_LENGTH} caracteres`,
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
    .max(NAME_LENGTH, ERRORS.USER_NAME),
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
    .oneOf([Yup.ref('password')], ERRORS.PASSWORD.MATCH)
    .required(ERRORS.REQUIRED),
  email: Yup.string().required(ERRORS.REQUIRED).email(ERRORS.EMAIL)
});

export const formUserProfileValidation = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-ZñÑ\s]*$/, ERRORS.USER.NAME)
    .required(ERRORS.REQUIRED),
  lastname: Yup.string()
    .matches(/^[a-zA-ZñÑ\s]*$/, ERRORS.USER.LASTNAME)
    .required(ERRORS.REQUIRED),
  password: Yup.string()
    .notRequired()
    .min(MIN_PASSWORD, ERRORS.PASSWORD.MIN)
    .matches(/^(?=.*[a-z])/, ERRORS.PASSWORD.LOWERCASE)
    .matches(/^(?=.*[A-Z])/, ERRORS.PASSWORD.UPPERCASE)
    .matches(/^(?=.*\d)/, ERRORS.PASSWORD.NUMBER)
    .matches(
      /^(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?])/,
      ERRORS.PASSWORD.SPECIAL
    ),
  repetPassword: Yup.string().when(
    'password',
    (password: Array<string | undefined>, schema) => {
      return (password[0] as undefined) === undefined
        ? schema.notRequired()
        : schema
            .oneOf([Yup.ref('password')], ERRORS.PASSWORD.MATCH)
            .required(ERRORS.REQUIRED);
    }
  )
});

export const formDeleteAccountValidation = Yup.object({
  password: Yup.string()
    .required(ERRORS.REQUIRED)
    .min(MIN_PASSWORD, ERRORS.PASSWORD.MIN)
    .matches(/^(?=.*[a-z])/, ERRORS.PASSWORD.LOWERCASE)
    .matches(/^(?=.*[A-Z])/, ERRORS.PASSWORD.UPPERCASE)
    .matches(/^(?=.*\d)/, ERRORS.PASSWORD.NUMBER)
    .matches(
      /^(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?])/,
      ERRORS.PASSWORD.SPECIAL
    )
});
