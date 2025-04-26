// style.js
const styles = {
    container: {
      display: 'flex',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#F7F7F7',
    },
    containerLeft: {
      padding: '20px',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0E1E1',
      backgroundImage: "url('/img/3.png')", // adjust path if needed
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: { xs: '0%', sm: '0%', md: '500px' },
      display: { xs: 'none', sm: 'none', md: 'flex' },
    },
    textBox: {
      maxWidth: '350px',
      textAlign: 'center',
    },
    title: {
      mt: 3,
      mb: 1,
    },
    description: {
      color: '#4B3B47',
    },
    containerRight: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      backgroundColor: 'inherit',
      width: { xs: '100%', sm: '100%', md: '70%' },
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
      backgroundColor: 'black',
      color: 'white',
      '&:hover': { backgroundColor: '#4B5563' },
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
    },
  };
  
  export default styles;
  