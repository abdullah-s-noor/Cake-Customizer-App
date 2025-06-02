import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// @ts-ignore
export let UserContext = createContext();
export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(()=>{return localStorage.getItem('userToken')||null});
  const logout=()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
  }
  return (
    <UserContext.Provider value={{ userToken, setUserToken ,logout}}>
      {children}
    </UserContext.Provider>
  );
}
