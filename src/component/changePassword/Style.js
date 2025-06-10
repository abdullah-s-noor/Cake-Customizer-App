import Theme from "../../../src/theme.js";

export const style = {
  TitleStyle: {
    fontWeight: "bold",
    fontSize: "36px",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 3,
    color:Theme.palette.primary.main,
  },

  FieldStyle: {
    width: "100%",

    marginBottom: "5px",
    "& .MuiInputLabel-root": {
      color: Theme.palette.primary.main,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: Theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#B0B0B0",
      },
      "&:hover fieldset": {
        borderColor: "#B0B0B0",
      },
      "&.Mui-focused fieldset": {
        borderColor: Theme.palette.primary.main,
      },
      "&.Mui-error fieldset": {
        borderColor: "#D32F2F",
      },
    },
    "& .MuiOutlinedInput-input": {
      color: Theme.palette.primary.main,
    },
    "& .MuiFormHelperText-root": {
      color: "#D32F2F",
      fontSize: "10px",
      marginTop: "1px",
    },
  },
  ButtonStyle: {
    backgroundColor: Theme.palette.primary.main,
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    fontSize: "18px",
    width: "100%",
    marginTop: "1rem",
  },
  AlreadyStyle: {
    textAlign: "center",
    fontSize: "16px",
    color: Theme.palette.primary.main,
    Width: "100%",
    marginTop: "10px",
  },
  containerStyle: {
    width: { xs: "90%", md: "50%", lg: "30%" },
    margin: "1rem auto",
    backgroundColor: "#fff",
    padding: "2rem 1rem",
    borderRadius: "10px",
    opacity: "0.95",
  },
  VerificationStyle: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(5px)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  successMessageBox: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#E6F4EA",
    color: Theme.palette.primary.main,
    padding: "20px 30px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: 1500,
    textAlign: "center",
    fontWeight: "bold",
  },
  FieldStyleChangePassword: {
    width: "100%",
    marginBottom: "15px",
    "& .MuiInputLabel-root": {
      color: Theme.palette.primary.main,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: Theme.palette.primary.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#B0B0B0",
      },
      "&:hover fieldset": {
        borderColor: "#B0B0B0",
      },
      "&.Mui-focused fieldset": {
        borderColor: Theme.palette.primary.main,
      },
      "&.Mui-error fieldset": {
        borderColor: "#D32F2F",
      },
    },
    "& .MuiOutlinedInput-input": {
      color: Theme.palette.primary.main,
    },
    "& .MuiFormHelperText-root": {
      color: "#D32F2F",
      fontSize: "10px",
      marginTop: "1px",
    },
  },
};