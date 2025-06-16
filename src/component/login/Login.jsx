import React, { useContext, useEffect, useState } from 'react'
import Input from '../../pages/Input'
import { useFormik } from 'formik'
import { Box, Card, Typography, Button, Alert, Link as MuiLink } from '@mui/material'
import axios from 'axios'
import validationSchema from './validationSchema'
import inputs from './inputs'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styles from '../register/styles';
import LeftSideAth from '../../pages/LeftSideAth'
import { Password, Token } from '@mui/icons-material'
import { UserContext } from '../context/User'
import { api } from '../../api/api'
function Login() {
    const navigate = useNavigate()
    const { userToken, setUserToken } = useContext(UserContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    useEffect(() => {
        if (userToken) {
            navigate(from, { replace: true });
        }
    }, [userToken, from, navigate]);
    const [serverError, setServerError] = useState('')
    const initialValues = {
        phone: '',
        password: '',
    }

    const onSubmit = async (values,{setSubmitting}) => {
        console.log('Sending Data:', values)
        try {
            const { data } = await api.post('/auth/login', values)
            console.log('Response from server:', data)
            setServerError('') // Clear any previous error
            localStorage.setItem("userToken", data.token);
            setUserToken(data.token);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setServerError(error.response.data.message)
            } else {
                setServerError('Something went wrong. Please try again.')
            }
        }finally{
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    })

    const renderInput = inputs(formik).map((input, index) => (
        <>
            {input.type === 'password' && <MuiLink variant="body2" component={RouterLink} to="/send-code" sx={{ textAlign: 'right', display: 'block', color: '#637381', textDecoration: 'none' }}>
                Forget Password?
            </MuiLink>}
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
        </>
    ))

    return (
        <>
            <Box sx={styles.container}>

                <LeftSideAth />
                <Box sx={styles.containerRight}>
                    <Card sx={styles.card}>
                        <Typography variant="h5" sx={{ mb: 1 }}>
                            Sign in to your account
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, color: '#637381' }}>
                            Don’t have an account?{' '}
                            <MuiLink component={RouterLink} to="/register" sx={styles.loginLink}>
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
                            <Button variant="contained" fullWidth type="submit" sx={styles.submitButton} disabled={formik.isSubmitting}>
                                {formik.isSubmitting?'Signing in...':'Sign In'}
                            </Button>
                            <Button variant="contained" fullWidth type="submit" sx={{ ...styles.exploreButton, display: { xs: 'flex', md: 'none' } }}
                                onClick={() => navigate('/')}
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

export default Login
