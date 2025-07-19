import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Button, Alert } from '@mui/material';
import { useFormik } from 'formik';
import Input from '../../../pages/Input';
import UploadFile from '../../../pages/UploadFile';
import validationSchema from './validationSchema';
import inputs from './inputs';
import ShapeSelector from '../../../pages/ShapeSelector';
import theme from '../../../theme';
import { toast } from 'react-toastify';
import ToppingPreviewArea from './ToppingPreviewArea';
import { api } from '../../../api/api';
import CollectionSelector from '../../../pages/CollectionSelector';
export default function Topping() {
    const [serverError, setServerError] = useState('');
    const [selectedShape, setSelectedShape] = useState(null);
    const [file, setFile] = useState(null);
    const [selectedCollection, setSelectedCollection] = useState(null);


    const formik = useFormik({
        initialValues: {
            topping: '',
            price: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                if (!selectedShape) {
                    setServerError('Please select a shape.');
                    setSubmitting(false);
                    return;
                }
                if (!selectedCollection) {
                    setServerError('Please select a collection.');
                    setSubmitting(false);
                    return;
                }

                if (!file) {
                    setServerError('Please upload a topping image.');
                    setSubmitting(false);
                    return;
                }

                const formData = new FormData();
                formData.append('name', `${selectedShape.name}_${values.topping.toLowerCase()}`);
                formData.append('price', values.price);
                formData.append('cakeCollection', selectedCollection._id);
                formData.append('image', file);

                // first post the topping data to the server
                const response1 = await api.post('/custom/topping', formData);
                const payload = {
                    toppingIds: [response1.data.item._id],
                };
                // then patch the shape with the topping data
                const response2 = await api.patch(`/custom/shapes/${selectedShape._id}/add-customization`, payload);

                toast.success('Topping added successfully!');
                setServerError('');
                resetForm();
                setFile(null);
                setSelectedShape(null);
                setSelectedCollection(null);
            } catch (error) {
                console.error(error);
                setServerError(error.response?.data?.message || 'Failed to add topping.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Box maxWidth={600} mx="auto" mt={5}>
            <Card sx={{ p: 0, m: 1, boxShadow: 3 }}>
                <Typography
                    variant="h5"
                    p={2}
                    mb={2}
                    sx={{ color: 'white', textAlign: 'center', bgcolor: theme.palette.primary.main, borderRadius: 1 }}
                >
                    Add New topping
                </Typography>
                {serverError && <Alert severity="error">{serverError}</Alert>}

                <Box component="form" onSubmit={formik.handleSubmit} noValidate m={3}>
                    {/* Shape Selector */}
                    <Box mb={2}>
                        <ShapeSelector selectedShape={selectedShape} onSelect={setSelectedShape} />
                    </Box>
                    {/* Collection Selector */}
                    <Box mb={2}>
                        <CollectionSelector selectedCollection={selectedCollection} onSelect={setSelectedCollection} />
                    </Box>
                    {/* Upload image */}
                    <Box mb={2}>
                        <UploadFile
                            file={file}
                            onFileSelect={(f) => setFile(f)}
                            onRemove={() => setFile(null)}
                            text='Add new topping image'
                        />
                    </Box>
                    {/* inputs => name and price */}
                    {inputs(formik).map((input, index) => (
                        <Box key={index} mb={2}>
                            <Input
                                type={input.type}
                                title={input.title}
                                id={input.id}
                                name={input.name}
                                value={input.value}
                                onChange={input.onChange}
                                onBlur={input.onBlur}
                                errors={input.errors}
                                touched={input.touched}
                                disabled={!selectedShape || formik.isSubmitting}
                            />
                        </Box>
                    ))}
                    {/* Preview the topping on the selected shape before submission */}
                    {/* This preview component is shown only when an image is uploaded and a shape is selected */}
                    <ToppingPreviewArea
                        file={file}
                        toppingData={{
                            image: { secure_url: file ? URL.createObjectURL(file) : '' },
                        }}
                        selectedShape={selectedShape}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Submitting...' : 'Add Topping'}
                    </Button>
                </Box>
            </Card>
        </Box>
    );


}