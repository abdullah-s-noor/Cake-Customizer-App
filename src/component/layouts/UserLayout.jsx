import { UserContext } from '../context/User';
import React, { useContext, useState, Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import Sidebar from '../sidebar/Sidebar.jsx';
import { Box } from '@mui/material';

function Layout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/send-code' ||
    location.pathname === '/forget-password' ||
    location.pathname === '/register';
  const drawerWidth = 280;
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {!isAuthPage && <Navbar drawerWidth={drawerWidth} />}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>

      {!isAuthPage &&

          <Footer />
      }
    </>
  );
}

export default Layout;
