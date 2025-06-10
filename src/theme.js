// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#723d46', // your custom primary color
    },
    secondary: {
      main: '#8e4c57', // your custom secondary color
    },
    background: {
      default: '#f7f7f7', // page background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    // Override default MUI component styles here if needed
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // All buttons rounded
        },
      },
    },
  },
});

export default theme;
