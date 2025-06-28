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
  const [userCounts, setUserCounts] = useState({
    cartCount: 0,
    favoritesCount: 0,
  });
  useEffect(() => {
    if (userToken) {
      getUserData();
      getUserCounts();
    } else {
      setUserInfo(null);
      setLoader(false);
      setUserCounts({ cartCount: 0, favoritesCount: 0 });
    }
  }, [userToken]);
  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserInfo(null);
    setUserCounts({ cartCount: 0, favoritesCount: 0 });
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
  const getUserCounts = async () => {
    try {
      const response = await api.get(`/user/counts`);
      if (response?.data) {
        setUserCounts(response.data);
        
      }
    } catch (err) {
      console.error("Error fetching user counts:", err);
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
    <UserContext.Provider value={{ userToken, setUserToken, logout, getUserData, userInfo, setUserInfo, loader, setLoader,userCounts ,getUserCounts}}>
      {children}
    </UserContext.Provider>
  );
}
