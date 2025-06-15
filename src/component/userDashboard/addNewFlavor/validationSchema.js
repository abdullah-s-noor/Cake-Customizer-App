import * as Yup from 'yup';

const validationSchema = Yup.object({
  flavor: Yup.string().required('Flavor name is required'),
  price: Yup.number().required('Price is required').positive(),
});

export default validationSchema;
