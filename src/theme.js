// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#875c69', // main color
    },
    secondary: {
      main: '#734f59', // hover color
    },
    background: {
      default: '#f9f9f9', // page background
    },
  
  },
  typography: {
    fontFamily: '"42dot Sans", sans-serif',
  },

});

export default theme;
