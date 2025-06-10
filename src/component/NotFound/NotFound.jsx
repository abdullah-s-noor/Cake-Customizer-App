import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Theme from "../../../src/theme";

export default function NotFound() {
  const navigate = useNavigate();
  document.title = "Page Not Found";

  return (
    <Box
      sx={{
        alignItems: "center",
        textAlign: "center",
        mt: 10,
        mb: 10,
      }}
    >
      
      <Typography
        variant="h1"
        sx={{ fontSize: "6rem", fontWeight: "bold", color: Theme.palette.primary.main }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 1, color: Theme.palette.primary.main }}
      >
        Page not found
      </Typography>
      <Typography sx={{ color: Theme.palette.primary.main, mb: 3 }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          bgcolor: Theme.palette.primary.main,

          "&:hover": { bgcolor: Theme.palette.secondary.main },
          textTransform: "none",
        }}
      >
        Back to home →
      </Button>
    </Box>
  );
}
