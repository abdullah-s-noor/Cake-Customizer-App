const inputs = (formik) => [
  {
    type: 'text',
    title: 'Flavor Name',
    id: 'flavor',
    name: 'flavor',
    value: formik.values.flavor,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    errors: formik.errors,
    touched: formik.touched,
  },
  {
    type: 'text',
    title: 'Price',
    id: 'price',
    name: 'price',
    value: formik.values.price,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    errors: formik.errors,
    touched: formik.touched,
  }
];

export default inputs;
