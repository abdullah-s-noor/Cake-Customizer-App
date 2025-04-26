const inputs = (formik) => [
    {
      type: 'tel',
      title: 'Phone:',
      id: 'phone',
      name: 'phone',
      value: formik.values.phone
    },
    {
      type: 'password',
      title: 'Password:',
      id: 'password',
      name: 'password',
      value: formik.values.password
    },
  ];
  
  export default inputs;
  