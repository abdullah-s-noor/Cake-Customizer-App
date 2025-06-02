import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Card,
  Typography,
  Button,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';

import validationSchema from './validationSchema';
import inputs from './inputs.js';
import Input from '../../pages/Input';
import LeftSideAth from '../../pages/LeftSideAth';
import styles from '../register/styles';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { ArrowBackIos } from '@mui/icons-material';

function SendCode() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const emailFromRoute = location.state?.email || '';
  const from = location.state?.from.pathname;
  const cameFromSendCode = (from === '/send-code');
  useEffect(() => {
    console.log(12)
    if (!cameFromSendCode) {
      navigate('/send-code')
    }
  }, [])
  const handleOtpChange = (newValue) => {
    setOtp(newValue);
    setShowPasswords(newValue.length === 4);

    if (newValue.length < 4) {
      // Clear password fields when code is incomplete
      formik.setFieldValue('password', '');
      formik.setFieldValue('confirmPassword', '');
    }
  };
  const handleResendCode = async () => {
    try {
      if (!emailFromRoute) return alert("Email is missing");

      const { data } = await axios.post('https://bimicake.onrender.com/auth/send-code', {
        email: emailFromRoute
      });
      alert('Code resent successfully ✅' + data.code);
    } catch (err) {
      console.error(err);
      alert('Failed to resend code ❌');
    }
  };


  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post('https://bimicake.onrender.com/auth/forgot-password', {
          code: otp,
          password: values.password,
        });

        if (res.data?.success || res.status === 200) {
          alert('Password reset successfully');
          navigate('/login');
        } else {
          setServerError(res.data.message || 'Reset failed');
        }
      } catch (err) {
        setServerError(err.response?.data?.message || 'Something went wrong');
      }
    }
  });

  const renderInput = inputs(formik)
    .filter((input) => input.name === 'email' || showPasswords)
    .map((input, index) => (
      <Input
        type={input.type}
        title={input.title}
        id={input.id}
        name={input.name}
        key={index}
        value={
          input.name === 'email'
            ? emailFromRoute
            : formik.values[input.name]
        }
        onChange={formik.handleChange}
        errors={formik.errors}
        onBlur={formik.handleBlur}
        touched={formik.touched}
        disabled={input.name === 'email'}
      />
    ));


  return (
    <Box sx={styles.container}>
      <LeftSideAth />
      <Box sx={styles.containerRight}>
        <Card sx={styles.card}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src="svg/request.svg" alt="Illustration" width="40%" />
            <Typography variant="h5" sx={{ mb: 1 }}>
              Reset Your Password
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: '#637381' }}>
              We've sent a 4-digit code to your email.<br />
              Please enter it to continue.
            </Typography>

            <MuiOtpInput value={otp} onChange={handleOtpChange} length={4} sx={{ mb: 2, }} TextFieldsProps={{
              placeholder: '-',
            }} />

            {serverError && (
              <Alert severity="error" sx={styles.errorAlert}>
                {serverError}
              </Alert>
            )}
          </Box>

          <Box component="form" onSubmit={formik.handleSubmit} sx={styles.form}>
            {renderInput}
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={styles.submitButton}
              disabled={!!(
                otp.length < 4 ||
                !formik.values.password ||
                !formik.values.confirmPassword ||
                (formik.values.confirmPassword !== formik.values.password) ||
                formik.errors.password ||
                formik.errors.confirmPassword ||
                !emailFromRoute
              )}
            >
              Reset Password
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mb: 1, color: '#637381', textAlign: 'center', mt: 2 }}>
            Don’t have a code?{' '}
            <Box
              component="span"
              onClick={handleResendCode}
              sx={{
                color: '#42a5f5',
                cursor: 'pointer',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Resend
            </Box>
          </Typography>
          <MuiLink
            variant="body2"
            component={RouterLink}
            to="/login"
            sx={styles.signInBack}
          >
            <ArrowBackIos fontSize="small" sx={{ fontSize: '10px' }} />
            Return to sign in
          </MuiLink>
        </Card>
      </Box>
    </Box>
  );
}

export default SendCode;
