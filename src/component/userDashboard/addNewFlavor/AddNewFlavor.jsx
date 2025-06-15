import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, Button, Alert } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import Input from '../../../pages/Input';
import UploadFile from '../../../pages/UploadFile';
import validationSchema from './validationSchema';
import inputs from './inputs';
import ShapeSelector from '../../../pages/ShapeSelector'; // Adjust the path if needed
import theme from '../../../theme';
import { toast } from 'react-toastify';
import FlavorPreviewArea from './FlavorPreviewArea';
import {api} from '../../../api/api';
export default function AddNewFlavor() {
    const [serverError, setServerError] = useState('');
    const [selectedShape, setSelectedShape] = useState(null);
    const [file, setFile] = useState(null);
    useEffect(() => {
        if(!file){
            
        }
    }, [file]);
    const formik = useFormik({
        initialValues: {
            flavor: '',
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

                if (!file) {
                    setServerError('Please upload a flavor image.');
                    setSubmitting(false);
                    return;
                }

                const formData = new FormData();
                formData.append('name', values.flavor.toLowerCase());
                formData.append('price', values.price);
                formData.append('image', file);
                console.log('Form Data Content:');
                formData.forEach((value, key) => {
                    console.log(`${key}:`, value);
                });
                const response= api.post('/custom/flavor', formData);
                console.log(response);
                toast.success('Flavor added successfully!');
                setServerError('');
                resetForm();
                setFile(null);
                setSelectedShape(null);
            } catch (error) {
                console.error(error);
                setServerError('Failed to add flavor.');
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
                    Add New flavor
                </Typography>
                {serverError && <Alert severity="error">{serverError}</Alert>}

                <Box component="form" onSubmit={formik.handleSubmit} noValidate m={3}>
                    {/* Shape Selector */}
                    <Box mb={2}>
                        <ShapeSelector selectedShape={selectedShape} onSelect={setSelectedShape} />
                    </Box>

                    {/* Upload image */}
                    <Box mb={2}>
                        <UploadFile
                            file={file}
                            onFileSelect={(f) => setFile(f)}
                            onRemove={() => setFile(null)}
                        />
                    </Box>

                    {/* Inputs - name & price */}
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
                    <FlavorPreviewArea
                        file={file}
                        flavorData={{
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
                        {formik.isSubmitting ? 'Submitting...' : 'Add Flavor'}
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}
