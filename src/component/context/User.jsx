import { api } from "../../api/api";
import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// @ts-ignore
export let UserContext = createContext();
export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(() => { return localStorage.getItem('userToken') || null });
  const [userInfo, setUserInfo] = useState(null);
  const [loader, setLoader] = useState(true);
  const logout = () => {
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserInfo(null);
    setLoader(true);
  }
  const getUserData = async () => {
    try {
      const response = await api.get(`/auth/profile`);
      if (response && response.data && response.data.user) {
        setUserInfo(response.data.user);
        console.log(response.data.user);
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch {
      toast.error("An error occurred while fetching user data");
    } finally {
      setLoader(false);
    }
  };

  return (
    <UserContext.Provider value={{ userToken, setUserToken, logout, getUserData, userInfo, setUserInfo, loader }}>
      {children}
    </UserContext.Provider>
  );
}
