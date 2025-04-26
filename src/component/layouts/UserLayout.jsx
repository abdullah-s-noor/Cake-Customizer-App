import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Sidebar from '../sidebar/Sidebar.jsx'
import { Box } from '@mui/material'

function Layout() {
  const [sidebarDisplay,setSidebarDisplay]=useState("none");
  const [sidebarType,setSidebarType]=useState('permanent')
  return (
    <>
        <Navbar setSidebarDisplay={setSidebarDisplay} setSidebarType={setSidebarType}/>
        <Sidebar sidebarDisplay={sidebarDisplay} sidebarType={sidebarType} setSidebarDisplay={setSidebarDisplay} />
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout