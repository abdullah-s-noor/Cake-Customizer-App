import { width } from "@mui/system";

// style.js
const styles = {
  container: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#F7F7F7',
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
    borderRadius: '10px'
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    borderRadius: '10px'
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
  },


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
    backgroundColor: 'inherit',
    width: { xs: '100%', sm: '100%', md: '60%' },
  },
  card: {
    padding: '20px',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: 'inherit',
    boxShadow: 'none', // remove MUI default shadow
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  submitButton: {
    backgroundColor: '#42a5f5',
    color: 'white',
    '&:hover': { backgroundColor: '#1e88e5' },
    textTransform: 'none',
  },
  loginLink: {
    color: 'primary.main',
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
    color: 'black', // your preferred link color
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
