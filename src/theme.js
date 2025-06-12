// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#123456', // main color
    },
    secondary: {
      main: '#432199', // hover color
    },
    background: {
      default: '#008080', // page background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
