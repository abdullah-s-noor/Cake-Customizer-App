import React from 'react'
import {
  Toolbar, Drawer, Divider, List,
  ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material'
import { Add, Home, Logout, Person2, Settings } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Search from '../../pages/Search'
import styles from './styles'

function Sidebar({ sidebarDisplay, sidebarType, setSidebarDisplay }) {
  
  const navigate = useNavigate();

  return (
    <>
      <Drawer
        sx={styles.drawer(sidebarDisplay)}
        variant={sidebarType}
        anchor="left"
        open={true}
        onClose={() => setSidebarDisplay('none')}
      >
        <List sx={styles.responsiveSearchList}>
          <ListItem disablePadding>
            <Search xs="block" md="none" />
          </ListItem>
        </List>

        <Toolbar sx={styles.toolbar} />
        <Divider />

        <List>
          {[
            { text: 'Home', icon: <Home />, path: '/' },
            { text: 'Create', icon: <Add />, path: '/create' },
            { text: 'Profile', icon: <Person2 />, path: '/profile' },
            { text: 'Settings', icon: <Settings />, path: '/settings' },
            { text: 'Logout', icon: <Logout />, path: '/' }
          ].map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar
