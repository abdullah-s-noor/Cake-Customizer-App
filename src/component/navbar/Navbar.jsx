import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Box, IconButton, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AccountCircle, Favorite, ShoppingCart, SmartButton } from '@mui/icons-material'
import { styles } from './styles'
import Search from '../../pages/Search'
import { useMediaQuery } from '@mui/material'
import './navBarStyle.css'
function Navbar({ setSidebarDisplay, setSidebarType }) {

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
          bgcolor: '#42a5f5',
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
            <a className='nav-link'>Home</a>
            <a className='nav-link'>About us</a>
            <a className='nav-link'>contact us</a>
          </div>
        }
        {/* Right - Icons */}
        <Box sx={styles.rightSection}>
          {/*<Search xs="none" md="block" />*/}
          <IconButton color="inherit" sx={styles.iconBtn}>
            <Favorite fontSize="medium" />
          </IconButton>
          <IconButton color="inherit" sx={styles.iconBtn}>
            <ShoppingCart fontSize="medium" />
          </IconButton>
          <IconButton color="inherit" sx={styles.iconBtn}>
            <AccountCircle fontSize="medium" />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar >
  )
}

export default Navbar
