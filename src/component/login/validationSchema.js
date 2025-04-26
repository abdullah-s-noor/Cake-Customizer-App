import * as yup from 'yup';
  const validationSchema=yup.object({
    password : yup.string().required().min(8),
    phone: yup
  .string()
  .required('Phone number is required')
  .matches(/^\+9705/, 'Phone number must start with +9705') // Validates the starting pattern
  .matches(/^\+9705\d{8}$/, 'Phone number must have exactly 13 digits') ,// Validates the entire phone number length
  })
export default validationSchema