import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  FormHelperText,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Validation from "./Validation";
import { api } from "../../api/api.js";
import { style } from "./Style";
import { toast } from "react-toastify";
import Theme from "../../../src/theme.js";

export default function ChangePassword() {
  document.title = "Change Password";

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await Validation.validate(userData, {
        abortEarly: false,
      });
      setLoading(true);
     
      const res = await api.put("/auth/change-password",{
        oldPassword: userData.oldPassword,
        newPassword: userData.newPassword,
      } ,{

        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(res.data.message);
      navigate("/profile");
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        toast.error(err.message || "Something Went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography
        variant="h1"
        sx={{ ...style.TitleStyle, marginBottom: "30px", marginTop: "100px" }}
      >
        Change Password
      </Typography>
      <Box sx={style.containerStyle}>
        <FormControl
          variant="outlined"
          sx={style.FieldStyleChangePassword}
          // @ts-ignore
          error={!!errors.oldPassword}
        >
          <InputLabel>Old Password</InputLabel>
          <OutlinedInput
            name="oldPassword"
            type={showOldPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  sx={{ color:Theme.palette.primary.main }}
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Old Password"
            value={userData.oldPassword}
            onChange={handleInputChange}
          />
          {errors.
// @ts-ignore
          oldPassword && (
            <FormHelperText>{errors.
// @ts-ignore
            oldPassword}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          variant="outlined"
          sx={style.FieldStyleChangePassword}
          // @ts-ignore
          error={!!errors.newPassword}
        >
          <InputLabel>New Password</InputLabel>
          <OutlinedInput
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  sx={{ color: Theme.palette.primary.main }}
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
            value={userData.newPassword}
            onChange={handleInputChange}
          />
          {errors.
// @ts-ignore
          newPassword && (
            <FormHelperText>{errors.
// @ts-ignore
            newPassword}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          variant="outlined"
          sx={style.FieldStyleChangePassword}
          // @ts-ignore
          error={!!errors.confirmPassword}
        >
          <InputLabel>Confirm Password</InputLabel>
          <OutlinedInput
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  sx={{ color: Theme.palette.primary.main}}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.
// @ts-ignore
          confirmPassword && (
            <FormHelperText>{errors.
// @ts-ignore
            confirmPassword}</FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          sx={style.ButtonStyle}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              Submitting... &nbsp;{" "}
              <CircularProgress size="1rem" color="success" />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </>
  );
}
