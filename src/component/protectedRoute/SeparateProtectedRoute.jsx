import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import React, { useContext } from 'react';

function SeparateProtectedRoute({ children }) {
    console.log("SeparateProtectedRoute rendered");
    const { userToken ,userInfo} = useContext(UserContext);
    const location =useLocation();
    const pathname = location.pathname;
    console.log("SeparateProtectwedRoute location:", location.pathname);
    if(userToken&&userInfo&&userInfo.role==='admin'&&(pathname==="/custom-cake" ||pathname==="/seeall"||pathname==="/"||pathname==="/cart"||pathname==="/favourite")){
        return <Navigate to="/notfound" state={{from:location}} replace />;
    }
    else if(!userToken&&(pathname==="/favourite" ||pathname==="/cart")){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    return children;
}

export default SeparateProtectedRoute;
