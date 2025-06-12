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
import { ArrowBackIos, Password } from '@mui/icons-material'
import { UserContext } from '../context/User'

function SendCode() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const {userToken}=useContext(UserContext);
      const location = useLocation();
      useEffect(() => {
          if (userToken) {
              navigate('/');
          }
      }, [userToken, navigate]);
  const initialValues = {
    email: ''

  }
  const onSubmit = async (values) => {
    console.log('Sending Data:', values)
    try {
      const { data } = await axios.post('https://bimicake.onrender.com/auth/send-code', values)
      console.log('Response from server:', data)
      setServerError('') // Clear any previous error
      navigate('/forget-password', { state: { email: values.email,from:location } });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message === "validation error") {
          console.log('Error during sending code:', error)
          setServerError(error.response.data.errormessages[0].email)

        } else {
          setServerError(error.response.data.message)
        }
      } else {
        setServerError('Something went wrong. Please try again.')
      }
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  const renderInput = inputs(formik).map((input, index) => (
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
              <img src="image\forgot-password.png" alt="Illustration" width="50%" />
              <Typography variant="h5" sx={{ mb: 1 }}>
                Forgot your password?
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, textAlign: 'center', color: '#637381' }}>
                Please enter the email address associated with your account and we'll email you a link to reset your password.
              </Typography>

              {serverError && (
                <Alert severity="error" sx={styles.errorAlert}>
                  {serverError}
                </Alert>
              )}

            </Box>
            <Box component="form" onSubmit={formik.handleSubmit} sx={styles.form}>
              {renderInput}
              <Button variant="contained" fullWidth type="submit" sx={styles.submitButton} disabled={formik.isSubmitting}>
                {formik.isSubmitting?'Sending...':'Send request'}
              </Button>
              <MuiLink
                variant="body2"
                component={RouterLink}
                to="/login"
                sx={styles.signInBack}
              >
                <ArrowBackIos fontSize="small" sx={{ fontSize: '10px' }} />
                Return to sign in
              </MuiLink>

            </Box>
          </Card>
        </Box>
      </Box>
    </>
  )
}

export default SendCode
