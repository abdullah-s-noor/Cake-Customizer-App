import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Email, Person, Phone, Visibility, VisibilityOff } from '@mui/icons-material';
function Input({ type, title, id, name, value, onChange, errors,onBlur,touched,disabled }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(prev => !prev);
// console.log(touched) 
  return (
    <>
      <TextField
        type={type === 'password' && showPassword ? 'text' : type}
        label={title}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        fullWidth
        variant="outlined"
        error={Boolean(errors[name]&&touched[name])}
        // The error prop is a boolean (true or false) that tells the TextField component whether or not to show the red border and apply error styles.
        onBlur={onBlur}
        helperText={(touched[name]&&errors[name] )? errors[name]:''}
        //when make untouched the 
        // Formik checks your validation function and adds an error for all fields.
        //now your job to add this code (touched[name]&&errors[name]) to display the errors for the field was toached
        InputLabelProps={type === 'date' && { shrink: true } }
        InputProps={{
          endAdornment: type === 'password' ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : type === 'email'?<Email/>:type === 'tel'?<Phone/>:type === 'text'?<Person/>:null,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-error": {
              "& fieldset": {
                borderColor: "red",
              },
            },
          },
          "& .MuiFormLabel-root.Mui-error": {
            color: "red",
          },
          "& .MuiFormHelperText-root.Mui-error": {
            color: "red",
          },
        }}
      />
      <br />
    </>
  );
}

export default Input;
