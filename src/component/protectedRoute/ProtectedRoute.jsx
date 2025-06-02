import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import React, { useContext } from 'react';

function ProtectedRoute({ children }) {
    const { userToken } = useContext(UserContext);
    const location =useLocation();
    
    if (!userToken) {
        return <Navigate to="/login"   state={{from:location}} replace/>;
        //we use Navigate component because you are not in  function call 
        //you are inside a conditional render
        //without replace:Now the user can click the  "Back" button and go back to the protected page they shouldn't be able to access (like /profile) when make logout.
    }

    return children;
}

export default ProtectedRoute;
