import * as yup from 'yup';
  const validationSchema=yup.object({
    password : yup.string().required().min(8),
    phone: yup
  .string()
    .required('Phone number is required')
    .matches(/^\+970/, 'Phone number must start with +970') // Validates the starting pattern
    .matches(/^\+970\d{9}$/, 'Phone number must have exactly 13 digits') ,// Validates the entire phone number length
})
export default validationSchema