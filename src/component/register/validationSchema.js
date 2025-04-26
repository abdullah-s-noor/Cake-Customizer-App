import * as yup from 'yup';
  const validationSchema=yup.object({
    username :yup.string().required().min(3).max(30),
    password : yup.string().required().min(8),
    email : yup.string().email().required(),
    phone: yup
  .string()
  .required('Phone number is required')
  .matches(/^\+9705/, 'Phone number must start with +9705') // Validates the starting pattern
  .matches(/^\+9705\d{8}$/, 'Phone number must have exactly 13 digits') ,// Validates the entire phone number length
    birthdate : yup.date().required()
  })
export default validationSchema