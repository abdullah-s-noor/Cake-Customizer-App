import { Box } from "@mui/system";
import { api } from "../../api/api";
import { createContext, use, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loaders/Loader";

// @ts-ignore
export let UserContext = createContext();
export default function UserContextProvider({ children }) {
  console.log("UserContext created");
  const [userToken, setUserToken] = useState(() => { return localStorage.getItem('userToken') || null });
  const [userInfo, setUserInfo] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (userToken) {
      getUserData();
    } else {
      setLoader(false);
      setUserInfo(null);
    }
  }, [userToken]);
  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserInfo(null);
    setLoader(true);

  }
  const getUserData = async () => {

    try {

      const response = await api.get(`/auth/profile`);
      console.log("User data response:", response);
      if (response && response.data && response.data.user) {
        setUserInfo(response.data.user);
      } else {
        toast.error("Failed to fetch user data");
      }

    } catch {
      toast.error("An error occurred while fetching user data");
    } finally {
      setLoader(false);
    }
  };
  if (loader) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Loader />
      </Box>
    );
  }

  return (
    <UserContext.Provider value={{ userToken, setUserToken, logout, getUserData, userInfo, setUserInfo, loader ,setLoader}}>
      {children}
    </UserContext.Provider>
  );
}
