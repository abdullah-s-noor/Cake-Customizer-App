const inputs = (formik) => [
  {
    type: 'email',
    title: 'Email:',
    id: 'email',
    name: 'email',
    value: formik.values.email
  },
];

export default inputs;
