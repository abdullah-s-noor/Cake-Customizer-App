import React, { use, useContext, useEffect, useState } from 'react'
import { AppBar, Toolbar, Box, IconButton, Link, Badge } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AccountCircle, Favorite, ShoppingCart, SmartButton } from '@mui/icons-material'
import { styles } from './styles'
import Search from '../../pages/Search'
import { useMediaQuery } from '@mui/material'
import './navBarStyle.css'
import { Link as MuiLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User'
function Navbar({ setSidebarDisplay, setSidebarType }) {
  const navigate = useNavigate();
  const { userToken, logout } = useContext(UserContext);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const [navBarProps, setNavBarProps] = useState({
    sx: {
      boxShadow: 'none',
      bgcolor: 'transparent',
      position: 'static'
    },
    color: 'primary',
  })

  useEffect(() => {

    if (location.pathname === '/') {
      setNavBarProps({
        sx: {
          boxShadow: 'none',
          bgcolor: 'transparent',
          position: 'absolute'
        },
        color: 'primary'
      })
    }
    else {
      setNavBarProps({
        sx: {
          bgcolor: '#723d46',
          position: 'static',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
        },
        color: 'primary'
      })
    }
  }, [location.pathname])

  return (

    <
      // @ts-ignore
      AppBar

      enableColorOnDark
      {...navBarProps}
    >
      <Toolbar sx={styles.toolbar}>
        {
          isSmallScreen &&
          < Box sx={styles.leftSection}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => {
                setSidebarDisplay('block')
                setSidebarType('temporary')
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        }

        {/* Center - Logo */}
        <Box sx={styles.logoBox}>
          <Link href="/" underline="none" color="inherit" sx={styles.logoLink}>
            <img src="public/image/2.png" alt="Logo" style={styles.logoImg} />
          </Link>
        </Box>

        {
          !isSmallScreen &&

          <div className='navbar-links'>
            <a className={location.pathname == '/' ? 'nav-link' : 'nav-link-notHome'}>Home</a>
            <a className={location.pathname == '/' ? 'nav-link' : 'nav-link-notHome'}>About us</a>
            <a className={location.pathname == '/' ? 'nav-link' : 'nav-link-notHome'}>contact us</a>
          </div>
        }
        {/* Right - Icons */}
        <Box sx={styles.rightSection}>
          {/*<Search xs="none" md="block" />*/}
          <IconButton color="inherit" sx={styles.iconBtn}>

            <Favorite fontSize="medium" />
          </IconButton>
          <IconButton color="inherit" sx={styles.iconBtn}>
            <Badge badgeContent={4} color="primary">
              <ShoppingCart fontSize="medium" />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            sx={styles.iconBtn}
            onClick={() => {
              if (userToken) {
                logout(); 
                console.log(1);             // clear context
              } else {
                navigate('/login');
              }
            }}
          >
            {userToken ? 'Logout' : <AccountCircle fontSize="medium" />}
          </IconButton>

        </Box>

      </Toolbar>
    </AppBar >
  )
}

export default Navbar
