import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";

export default function EditUserInformation() {
  document.title = "Edit User Information";
  const [user, setUser] = useState({
    fullName: "yousef sami hamed ghawi",
    email: "yousefghawi13@gmail.com",
    mobileNumber: "0595857463",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {};

  const handleCancel = () => {};

  return (
    <>
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, mb: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit User Information
        </Typography>
        <Typography variant="body2" align="center">
          Updating user details.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobileNumber"
              value={user.mobileNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button variant="contained" color="success" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
