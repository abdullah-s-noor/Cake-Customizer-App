import * as yup from 'yup';
  const validationSchema=yup.object({
    username :yup.string().required().min(3).max(30),
    password : yup.string().required().min(8),
    email : yup.string().email().required(),
    phone: yup
  .string()
  .required('Phone number is required')
  .matches(/^\+970/, 'Phone number must start with +970') // Validates the starting pattern
  .matches(/^\+970\d{9}$/, 'Phone number must have exactly 13 digits') ,// Validates the entire phone number length
    birthdate : yup.date().required()
  })
export default validationSchema