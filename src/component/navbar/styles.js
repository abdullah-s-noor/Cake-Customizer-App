// styles.js

import { color } from "@mui/system";

export const styles = {
  appBar: {
    bgcolor: 'inherit',
    width: '100%',
    boxShadow: 'none',
  },
  toolbar: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    width: '40%',
  },
  logoBox: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'start',
  },
  logoLink: {
    "&:hover": { color: "#d50000" },
  },
  logoImg: {
    width: '150px',
    maxWidth: '100%',
  },
  rightSection: {
    width: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: {xs:'0px',sm:'8px'},
  },

  // 💖 Styled Icon Buttons
  iconBtn: {
    
    '&:hover': {
      backgroundColor: '#fff',
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
      transform: 'scale(1.1)',
    },
  },

  favoriteIcon: {
    color: '#fff',
    '&:hover': {
      color: '#e63946',
      backgroundColor: '#ffe6e6',
    },
  },

  cartIcon: {
    color: '#fff',
    '&:hover': {
      color: '#0077b6',
      backgroundColor: '#e0f7fa',
    },
  },

  accountIcon: {
    color: '#fff',
    '&:hover': {
      color: '#0077b6',
      backgroundColor: '#e0f7fa',
    },
  },

  logoutIcon: {
    color: '#fff',
    '&:hover': {
      color: '#e63946',
      backgroundColor: '#ffe6e6',
    },
  },
};
