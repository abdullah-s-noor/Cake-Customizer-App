import * as Yup from 'yup';

const change = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Old Password is required')
        .min(8, 'Password must be at least 8 characters long'),
    newPassword: Yup.string()
        .required('New Password is required')
        .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    });
    export default change;

    
   