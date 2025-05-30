import { Card, Typography, Button, Box, Divider } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Style from "./Styles";
import { api } from "../../api/api";
import { toast } from "react-toastify";

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

export default function Profile() {
  const navigate = useNavigate();
  document.title = "User Profile";
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const GetUserData = async () => {
      try {
        const response = await api.get(`/auth/profile`);
        if (response && response.data && response.data.user) {
          setUserInfo(response.data.user);
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch {
        toast.error("An error occurred while fetching user data");
      }
    };

    GetUserData();
  }, []);

  return (
    <>
      <Box sx={Style.mainStyle}>
        <Card sx={Style.cardStyle}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#723d46" }}>
            User Information
          </Typography>
          <Box
            sx={{
              display: "flex",
              marginTop: 1,
              justifyContent: "center",
              width: "100%",
            }}
          >
            {userInfo ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 2,
                  width: "100%",
                  maxWidth: 400,
                  background: "#f9f6f7",
                  borderRadius: 2,
                  p: 3,
                  boxShadow: 2,
                }}
              >
                <Typography
                  variant="h6"
                  color="#723d46"
                  fontWeight="bold"
                  gutterBottom
                >
                  {userInfo.username}
                </Typography>
                <Typography variant="body2" color="#C6B7B7" gutterBottom>
                  {userInfo.email}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <PhoneIcon fontSize="small" sx={{ color: "#723d46" }} />
                  <Typography fontSize={16} color="#723d46">
                    {userInfo.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayIcon
                    fontSize="small"
                    sx={{ color: "#723d46" }}
                  />
                  <Typography fontSize={16} color="#723d46">
                    {formatDateToLong(userInfo.birthdate)}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography variant="h6" margin={3} color="#723d46">
                Loading...
              </Typography>
            )}
          </Box>
          <Divider sx={{ mt: 4, backgroundColor: "#723d46" }}></Divider>

          <Box sx={Style.BoxStyle}>
            <Button
              onClick={() => navigate("/EditUserInformation")}
              variant="contained"
              sx={Style.btnStyle}
            >
              Edit
            </Button>
            <Button
              onClick={() => navigate("/ChangePassword")}
              variant="contained"
              sx={Style.btnStyle}
            >
              Change Password
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
}
