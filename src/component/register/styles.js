import { width } from "@mui/system";
import theme from '../../theme';
// style.js
const styles = {
  container: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'theme.palette.background.default',
  },
  containerLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    width: { xs: '0%', sm: '0%', md: '40%' },
    minHeight: '100vh',
    display: { xs: 'none', sm: 'none', md: 'flex' },

  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
    borderRadius: '0px'
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    borderRadius: '0px'
  },

  textBox: {
    maxWidth: '400px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    color: 'white',
    px: { xs: 2, md: 4 },       // better padding on mobile
    py: { xs: 4, md: 6 },       // vertical breathing room
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    mt: 2,
    mb: 2,
    fontWeight: 700,
    fontSize: { xs: '1.8rem', md: '2.4rem' },
    letterSpacing: '0.5px',
    lineHeight: 1.3,
    fontFamily: '"Dancing Script", cursive',
    fontStyle: 'normal',
    fontOpticalSizing: 'auto',
  }
  ,


  description: {
    color: '#f0f0f0',
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  exploreButton: {
    mt: 4,
    px: 4,
    py: 1.5,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    color: '#4B3B47',
    borderRadius: '8px',
    boxShadow: 3,
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },

  }
  ,
  containerRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: 'inherit',//inherit background color from container
    width: { xs: '100%', sm: '100%', md: '60%' },
  },
  card: {
    padding: '20px',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    border: 'none',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)' // remove MUI default shadow
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  submitButton: {
    backgroundColor:theme.palette.primary.main,
    color: 'white',
    '&:hover': { backgroundColor: theme.palette.secondary.main },
    textTransform: 'none',
    '&.Mui-disabled': {
      backgroundColor: '#9e9e9e', 
      color: '#ffffff',
    },
  },
  loginLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
  errorAlert: {
    mb: 2,
    bgcolor: '#FFE9D5',
    color: '#7A0916',
    width: '100%',
  },
  signInBack: {
    textAlign: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: theme.palette.primary.main, 
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    mt: 2,
    '&:hover': {
      textDecoration: 'underline',
    }
  }
};

export default styles;
