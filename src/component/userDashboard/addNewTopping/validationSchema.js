import * as Yup from 'yup';

const validationSchema = Yup.object({
  topping: Yup.string().required('Topping name is required'),
  price: Yup.number().required('Price is required').positive(),
});

export default validationSchema;
