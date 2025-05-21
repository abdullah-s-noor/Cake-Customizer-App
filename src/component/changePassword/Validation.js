import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    });

export default validationSchema;