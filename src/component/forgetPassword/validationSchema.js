import * as yup from 'yup';

const validationSchema = yup.object({
  password: yup.string().min(8, 'At least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default validationSchema;
