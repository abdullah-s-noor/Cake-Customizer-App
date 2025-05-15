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
    Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { style } from './Style';
import { toast } from "react-toastify";

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

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });

        if (hasSubmitted) {
            const errorMsg = validateField(name, value);
            setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
        }
    };

    const validateField = (name, value) => {
        let errorMsg = "";

        if (!value.trim()) {
            errorMsg = "This field is required.";
        } else {
            switch (name) {
                case "newPassword":
                    if (value.length < 8) {
                        errorMsg = "Password must be at least 8 characters long.";
                    } else if (!/[a-z]/.test(value)) {
                        errorMsg = "Password must contain at least one lowercase letter.";
                    } else if (!/[A-Z]/.test(value)) {
                        errorMsg = "Password must contain at least one uppercase letter.";
                    } else if (!/[0-9]/.test(value)) {
                        errorMsg = "Password must contain at least one number.";
                    } else if (!/[!@#$%^&*]/.test(value)) {
                        errorMsg = "Password must contain at least one special character: !@#$%^&*";
                    }
                    break;
                case "confirmPassword":
                    if (value !== userData.newPassword) {
                        errorMsg = "Passwords do not match.";
                    }
                    break;
                default:
                    break;
            }
        }
        return errorMsg;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const newErrors = {};

        Object.keys(userData).forEach((field) => {
            const errorMsg = validateField(field, userData[field]);
            if (errorMsg) {
                newErrors[field] = errorMsg;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            setLoading(true);
            const res = await api.post("/auth/changePassword", {
                oldPassword: userData.oldPassword,
                newPassword: userData.newPassword,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            setLoading(false);
            toast.success(res.data.message || "Password changed successfully!");
            navigate("/login");

        } catch (err) {
            setLoading(false);
            toast.error(err.response?.data?.message || err.message || "Something went wrong.");
        }
    };

    return (
        <>
            <Typography variant="h1" sx={{ ...style.TitleStyle, marginBottom: "30px", marginTop: "100px" }}>  
                Change Password
            </Typography>
            <Box sx={style.containerStyle}>
                <FormControl variant="outlined" sx={style.FieldStyleChangePassword} error={hasSubmitted && !!errors.oldPassword}>
                    <InputLabel>Old Password</InputLabel>
                    <OutlinedInput
                        name="oldPassword"
                        type={showOldPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowOldPassword(!showOldPassword)} sx={{ color: "#1F4B43" }}>
                                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Old Password"
                        value={userData.oldPassword}
                        onChange={handleInputChange}
                    />
                    {hasSubmitted && errors.oldPassword && <FormHelperText>{errors.oldPassword}</FormHelperText>}
                </FormControl>

                <FormControl variant="outlined" sx={style.FieldStyleChangePassword} error={hasSubmitted && !!errors.newPassword}>
                    <InputLabel>New Password</InputLabel>
                    <OutlinedInput
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowNewPassword(!showNewPassword)} sx={{ color: "#1F4B43" }}>
                                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="New Password"
                        value={userData.newPassword}
                        onChange={handleInputChange}
                    />
                    {hasSubmitted && errors.newPassword && <FormHelperText>{errors.newPassword}</FormHelperText>}
                </FormControl>

                <FormControl variant="outlined" sx={style.FieldStyleChangePassword} error={hasSubmitted && !!errors.confirmPassword}>
                    <InputLabel>Confirm Password</InputLabel>
                    <OutlinedInput
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} sx={{ color: "#1F4B43" }}>
                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                        value={userData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    {hasSubmitted && errors.confirmPassword && <FormHelperText>{errors.confirmPassword}</FormHelperText>}
                </FormControl>

                <Button
                    variant="contained"
                    sx={style.ButtonStyle}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (<>Submitting... &nbsp; <CircularProgress size="1rem" color="success" /></>) : "Submit"}
                </Button>
            </Box>
        </>
    );
}
