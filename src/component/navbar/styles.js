// style.js

import { Box } from "@mui/material";
import { border } from "@mui/system";

// #42a5f5
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
    },
    iconBtn: {
      mr: '4px',
    }
  };
  