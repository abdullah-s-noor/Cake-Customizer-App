import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Sidebar from '../sidebar/Sidebar.jsx'
import { Box } from '@mui/material'

function Layout() {

  const [sidebarDisplay, setSidebarDisplay] = useState("none");
  const [sidebarType, setSidebarType] = useState('permanent');

  

  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/send-code' || location.pathname === '/forget-password' || location.pathname === '/register';
  return (
    <>
      {!isAuthPage && (
        <>
          <Navbar setSidebarDisplay={setSidebarDisplay} setSidebarType={setSidebarType}  />
          <Sidebar sidebarDisplay={sidebarDisplay} sidebarType={sidebarType} setSidebarDisplay={setSidebarDisplay} />
        </>
      )}
      <Outlet/>
      {!isAuthPage && <Footer />}
    </>
  )
}

export default Layout