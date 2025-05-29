import React, { useState } from 'react'
import Input from '../../pages/Input'
import { useFormik } from 'formik'
import { Box, Card, Typography, Button, Link as MuiLink, Alert } from '@mui/material';
import axios from 'axios';
import validationSchema from './validationSchema';
import inputs from './inputs';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import styles from './styles';
import LeftSideAth from '../../pages/LeftSideAth';
function Register() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('')
    const initialValues = {
        email: '',
        phone: '',
        username: '',
        password: '',
        birthdate: ''
    }
    const onSubmit = async (values) => {
        console.log('Sending Data:', values);
        try {
        const {data} = await axios.post('https://bimicake.onrender.com/auth/register', values)
        console.log('Response from server:', data)
        setServerError('') // Clear any previous error
        } catch (error) {
            console.log('Error during registration:', error);
        if (error.response && error.response.data && error.response.data.message) {
            setServerError(error.response.data.message)
        } else {
            setServerError('Something went wrong. Please try again.')
        }
        }
    };
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    }

    );
    const renderInput = inputs(formik).map((input, index) =>(
        <Input
            type={input.type}
            title={input.title}
            id={input.id}
            name={input.name}
            key={index}
            value={input.value}
            onChange={formik.handleChange}
            errors={formik.errors}
            onBlur={formik.handleBlur}
            touched={formik.touched}
            disabled={false}
        />
    ))
    return (
    <>
        <Box sx={styles.container}>
            <LeftSideAth />
            <Box sx={styles.containerRight}>
                <Card sx={styles.card}>
                    <Typography variant="h5" sx={{ mb: 1 }}>
                        Get Started
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 ,color:'#637381' }}>
                        Already have an account?{' '}
                        <MuiLink component={RouterLink} to="/login" sx={styles.loginLink}>
                            Get started
                        </MuiLink>
                    </Typography>
                    {serverError && (
                        <Alert severity="error" sx={styles.errorAlert}>
                            {serverError}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={formik.handleSubmit} sx={styles.form}>
                        {renderInput}
                        <Button variant="contained" fullWidth type="submit" sx={styles.submitButton}>
                            Create Account
                        </Button>
                        <Button variant="contained" fullWidth type="submit" sx={{...styles.exploreButton ,display:{xs:'flex',md:'none'}}}
                            onClick={() => navigate('/home')}
                        >
                            Explore As Guest
                        </Button>

                    </Box>
                    
                </Card>
                
            </Box>
            
        </Box>
    </>
)
}

export default Register

{/* Formik 
    هي مكتبة شهيرة في 
    React
     لتسهيل إدارة النماذج، حيث تساعد في التحكم في القيم والتحقق من البيانات وإرسال النموذج بسهولة. كما تدعم التكامل مع مكتبة 
     Yup 
     للتحقق من القيم بشكل بسيط. 🚀 */}



//      onBlur triggers field-specific validation when a field is left (unfocused).
// touched ensures errors are only shown after a field has been interacted with.
// formik.errors holds the validation messages.
    

// Example Scenario: (Your Code in Action)
// You click on the Email input field — nothing happens yet.
// You leave (unfocus) the Email input field (onBlur triggers).
// Formik adds email: true to formik.touched.
// Formik checks your validation function and adds an error if the email field is empty.
// If an error is present, it shows the error message because formik.errors.email exists and formik.touched.email is true.

