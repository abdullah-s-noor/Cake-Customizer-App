const inputs = (formik) => [
    {
      type: 'email',
      title: 'Email:',
      id: 'email',
      name: 'email',
      value: formik.values.email
    },
    {
      type: 'tel',
      title: 'Phone:',
      id: 'phone',
      name: 'phone',
      value: formik.values.phone
    },
    {
      type: 'text',
      title: 'Username:',
      id: 'username',
      name: 'username',
      value: formik.values.username
    },
    {
      type: 'password',
      title: 'Password:',
      id: 'password',
      name: 'password',
      value: formik.values.password
    },
    {
      type: 'date',
      title: 'Birthdate:',
      id: 'birthdate',
      name: 'birthdate',
      value: formik.values.birthdate
    }
  ];
  
  export default inputs;
  