import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Card, Typography, Alert } from '@mui/material';
import { useFormik } from 'formik';
import Input from '../../../pages/Input';
import validationSchema from './validationSchema';
import inputs from './inputs';
import theme from '../../../theme';
import UploadFile from '../../../pages/UploadFile';
import { toast } from 'react-toastify';
import { api } from '../../../api/api';
import ShapePreviewArea from './ShapePreviewArea';
import { UserContext } from '../../context/User';
import { useNavigate } from 'react-router-dom';
function AddNewShape() {
    const [serverError, setServerError] = useState('');
    const [file, setFile] = useState(null);
    const formik = useFormik({
        initialValues: {
            shape: '',
            price: '',
            weight: '',
            capacity: '',
            dimensions: '',
            d: '',
            viewBox: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                if (!file) {
                    setServerError('Please upload an image.');
                    setSubmitting(false);
                    return;
                }

                const formData = new FormData();
                formData.append('name', values.shape.toLowerCase());
                formData.append('price', values.price);
                formData.append('weight', values.weight);
                formData.append('capacity', values.capacity);
                formData.append('dimensions', values.dimensions);
                formData.append('d', values.d);
                formData.append('viewBox', values.viewBox);
                formData.append('image', file);

                const response = await api.post("/custom/shape", formData);
                setServerError('');
                toast.success('Shape added successfully!');
                resetForm();
                setFile(null);
            } catch (error) {
                setServerError(error.response?.data?.message || 'Failed to add shape.');
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Box maxWidth={600} width={'100%'} mx="auto" mt={5}>
            <Card sx={{ p: 0, m: 1, boxShadow: 3 }}>
                <Typography
                    variant="h5"
                    p={2}
                    mb={2}
                    sx={{ color: 'white', textAlign: 'center', bgcolor: theme.palette.primary.main, borderRadius: 1 }}
                >
                    Add New Shape
                </Typography>

                {serverError && <Alert severity="error">{serverError}</Alert>}

                <Box component="form" onSubmit={formik.handleSubmit} noValidate m={3}>
                    {/*Upload File */}
                    <Box mb={2}>
                        <UploadFile
                            file={file}
                            onFileSelect={(f) => setFile(f)}
                            onRemove={() => setFile(null)}
                            text='Add new shape image'
                        />
                    </Box>
                    {/* inputs => name, price, weight, capacity, dimensions, svg Path, svg viewBox*/}
                    {inputs(formik)
                        .map((input, index) => (
                            <Box key={index} mb={2}>
                                <Input
                                    type={input.type}
                                    title={input.title}
                                    id={input.id}
                                    name={input.name}
                                    value={input.value}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    errors={formik.errors}
                                    touched={formik.touched}
                                    disabled={formik.isSubmitting}
                                />
                            </Box>
                        ))}
                    {/* check SVG Path and ViewBox on the shape before submission */}
                    <ShapePreviewArea
                        file={file}
                        shapeData={{
                            image: { secure_url: file ? URL.createObjectURL(file) : '' },
                            d: formik.values.d,
                            viewBox: formik.values.viewBox,
                            name: formik.values.shape
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Submitting...' : 'Add Shape'}
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}

export default AddNewShape;
