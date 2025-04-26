import React from 'react'
import { AppBar, Toolbar, Box, IconButton, Link } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AccountCircle, Favorite, ShoppingCart } from '@mui/icons-material'
import {styles } from './styles'
import Search from '../../pages/Search'

function Navbar({ setSidebarDisplay, setSidebarType }) {
  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        
        {/* Left - Menu Button */}
        <Box sx={styles.leftSection}>
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

        {/* Center - Logo */}
        <Box sx={styles.logoBox}>
          <Link href="/" underline="none" color="inherit" sx={styles.logoLink}>
            <img src="public/image/2.png" alt="Logo" style={styles.logoImg} />
          </Link>
        </Box>

        {/* Right - Icons */}
        <Box sx={styles.rightSection}>
          <Search xs="none" md="block" />
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
    </AppBar>
  )
}

export default Navbar
