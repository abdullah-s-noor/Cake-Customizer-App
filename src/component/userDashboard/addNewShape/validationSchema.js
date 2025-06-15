import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    shape: Yup.string().required('Name is required'),
    price: Yup.string().required('Price is required'),
    weight: Yup.string().required('Weight is required'),
    capacity: Yup.string().required('Capacity is required'),
    dimensions: Yup.string().required('Dimensions are required'),
    d: Yup.string().required('SVG path is required'),
    viewBox: Yup.string().required('ViewBox is required'),
    
});

export default validationSchema;
