import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import { EditValidationSchema } from "./validation";
import { UserContext } from "../context/User";
import Loader from "../Loaders/Loader";
import Theme from "../../../src/theme.js";

function formatDateToLong(dateString) {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
export default function EditUserInformation() {
  document.title = "Edit User Information";
  const { loader, getUserData, userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    birthdate: "",
  });
  const [originalUser, setOriginalUser] = useState(null);
  useEffect(() => {
    if (!userInfo) {
      getUserData();
    }
    if (userInfo) {
      setUser(userInfo);
      setOriginalUser(userInfo);
    }
  }, [userInfo]);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSave = async () => {
    if (
      originalUser &&
      user.username === originalUser.username &&
      user.birthdate === originalUser.birthdate
    ) {
      toast.info("No changes were made to your profile information.");
      return;
    }
    setLoading(true);

    try {
      await EditValidationSchema.validate(user, { abortEarly: false });

      const payload = {
        username: user.username,
        birthdate: user.birthdate,
      };

      const response = await api.put("/auth/profile", payload);
      const { email, username, birthdate, phone } = response.data.user;
      if (response && response.data && response.data.message) {
        toast.success(response.data.message);
        setUserInfo({ email, username, birthdate, phone });
        navigate("/profile");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        toast.error("An error occurred while updating user information.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    toast.success("Changes canceled.");
    navigate("/profile");
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {loader ? <Loader /> :
          <Box
            sx={{
              maxWidth: 400,
              mx: "auto",
              mt: 10,
              mb: 10,
              flexGrow: 1,
              px: { xs: 4, md: 0 },
            }}
          >
            <Typography variant="h5" align="center" gutterBottom sx={{ color: Theme.palette.primary.main }}>
              Edit User Information
            </Typography>
            <Typography variant="body2" align="center" sx={{ color: Theme.palette.primary.main }}>
              Updating user details.
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
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
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Birth Date"
                  name="birthdate"
                  type="date"
                  value={
                    formatDateToLong(user.birthdate)
                      ? user.birthdate.slice(0, 10)
                      : ""
                  }
                  onChange={handleChange}
                  error={Boolean(errors.birthdate)}
                  helperText={errors.birthdate}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
              >
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{ background: Theme.palette.primary.main }}
                >
                  {loading ? "Saving..." : "Save"}
                  
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCancel}
                  sx={{ background:Theme.palette.primary.main }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        }
      </Box>
    </>
  );
}
