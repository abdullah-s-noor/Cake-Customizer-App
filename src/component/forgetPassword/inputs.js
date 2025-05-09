const inputs = (formik) => [
  {
    type: 'email',
    title: 'Email:',
    id: 'email',
    name: 'email',
    value: formik.values.email,
  },
  {
    type: 'password',
    title: 'New Password:',
    id: 'password',
    name: 'password',
    value: formik.values.password,
  },
  {
    type: 'password',
    title: 'Confirm Password:',
    id: 'confirmPassword',
    name: 'confirmPassword',
    value: formik.values.confirmPassword,
  },
];

export default inputs;
