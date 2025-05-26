import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
        sx={{ fontSize: "6rem", fontWeight: "bold", color: "#723d46" }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", mb: 1, color: "#723d46" }}
      >
        Page not found
      </Typography>
      <Typography sx={{ color: "#723d46", mb: 3 }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          bgcolor: "#723d46",
          "&:hover": { bgcolor: "#0f3e3a" },
          textTransform: "none",
        }}
      >
        Back to home →
      </Button>
    </Box>
  );
}
