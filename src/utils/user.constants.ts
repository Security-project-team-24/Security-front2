import * as yup from 'yup';

export const CHANGE_PASSWORD_VALIDATION_SCHEMA = yup.object({
  oldPassword: yup
    .string()
    .required()
    .min(8)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include one digit, one uppercase letter, one lowercase letter, and one special character'
    ),
  newPassword: yup
    .string()
    .required()
    .min(8)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include one digit, one uppercase letter, one lowercase letter, and one special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('newPassword')],
      'Confirm passwords must match with new password'
    ),
});

export const CHANGE_PASSWORD_DEFAULT_VALUES = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const ADD_SKILL_VALIDATION_SCHEMA = yup.object({
  skills: yup.string().required(),
  strength: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === '' ? null : value
    )
    .typeError('Skill value must be a number')
    .required('Skill value is required')
    .min(1)
    .max(5)
    .test(
      'is-number',
      'Skill value must be a number',
      (value) => !isNaN(value)
    ),
});

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};
