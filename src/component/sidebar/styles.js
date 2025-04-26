// src/styles/style.js

const styles = {
    drawer: (display) => ({
      display: display,
      width: '240px',
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: '300px',
        boxSizing: 'border-box',
        bgcolor: '', // You can customize the background color
      },
    }),
    toolbar: {
      minHeight: '0px !important',
      width: '100%',
    },
    responsiveSearchList: {
      display: { xs: 'block', md: 'none' },
    },
  }
  
  export default styles;
  