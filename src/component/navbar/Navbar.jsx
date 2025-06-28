import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Link,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Typography
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Add,
  Person2,
  Settings,
  Logout,
  Favorite,
  ShoppingCart,
  AccountCircle,
  PersonAddAlt,
  Login,
  Cake,
  ContactMail,
  Info,
  Dashboard,
  Category,
  AddCircle,
  ListAlt,
  CollectionsBookmark,
  Group,
  Create,
  Icecream,
  BrushTwoTone

} from '@mui/icons-material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Heart } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../context/User';
import { styles } from './styles';
import Search from '../../pages/Search';
import './navBarStyle.css';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';
function Navbar({ drawerWidth }) {
  const navigate = useNavigate();
  const { userToken, userInfo, logout, userCounts } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isAdmin = userToken && userInfo?.role === 'admin';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navBarProps, setNavBarProps] = useState({
    sx: {
      boxShadow: 'none',
      bgcolor: 'transparent',
      position: 'static'
    },
    color: 'primary'
  });

  useEffect(() => {
    if (location.pathname === '/') {
      setNavBarProps({
        sx: {
          boxShadow: 'none',
          bgcolor: 'transparent',
          position: 'absolute'
        },
        color: 'primary'
      });
    } else {
      setNavBarProps({
        sx: {
          bgcolor: theme.palette.primary.main,
          position: 'static',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
        },
        color: 'primary'
      });
    }
  }, [location.pathname]);



  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    logout();
  };
  const drawerGuest = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: (<><span>Customize</span><br /><span>Your Cake</span></>), icon: <Cake />, path: '/custom-cake' },
    { text: 'SignUp', icon: <PersonAddAlt />, path: '/register' },
    { text: 'About Us', icon: <Info />, path: '/' },
    { text: 'Contact Us', icon: <ContactMail />, path: '/' },
    { text: 'Login', icon: <Login />, path: '/Login' },
  ];
  const drawerUser = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: (<><span>Customize</span><br /><span>Your Cake</span></>), icon: <Cake />, path: '/custom-cake' },
    { text: 'Profile', icon: <Person2 />, path: '/profile' },
    { text: 'Favorite', icon: <Favorite />, path: '/favorite' },
    { text: 'Order', icon: <HistoryIcon />, path: '/order' },
    { text: 'Cart', icon: <ShoppingCart />, path: '/cart' },
    { text: 'About Us', icon: <Info />, path: '/' },
    { text: 'Contact Us', icon: <ContactMail />, path: '/' },
    { text: 'Logout', icon: <Logout />, action: handleLogout }

  ];
  const drawerAdmin = [
    { text: 'Dashboard Home', icon: <Dashboard />, path: '/dashboard/' },
    
    { text: 'Create New Cake', icon: <Create />, path: '/dashboard/addnewcake' },
    {
      text: 'Add List',
      icon: <AddCircle />,
      children: [
        { text: 'Add New Topping', icon: <AddCircle />, path: '/dashboard/addnewtopping' },
        { text: 'Add New Shape', icon: <AddCircle />, path: '/dashboard/addnewshape' },
        { text: 'Add New Flavor', icon: <AddCircle />, path: '/dashboard/addnewflavor' },
      ],
    },
    {
      text: 'Manage List',
      icon: <FormatListBulletedIcon />,
      children: [
        { text: 'Manage Orders', icon: <ListAlt />, path: '/dashboard/adminmanageorders' },
        { text: 'Manage Collections', icon: <CollectionsBookmark />, path: '/dashboard/adminmanagecollections' },
        { text: 'Manage Users', icon: <Group />, path: '/dashboard/adminmanageusers' },
        {
          text: "Manage Cake",
          icon: <Cake />,
          children: [
            { text: 'Manage Toppings', icon: <BrushTwoTone />, path: '/dashboard/adminmanagetoppings' },
            { text: 'Manage Shapes', icon: <Cake />, path: '/dashboard/adminmanageshapes' },
            { text: 'Manage Flavors', icon: <Icecream />, path: '/dashboard/adminmanageflavors' },
          ],
        },
      ],
    },

    {
      text: "Get All Cake", icon: <Cake />, path: "/dashboard/getcakes",
    },

    { text: 'Profile', icon: <Person2 />, path: '/profile' },
    { text: 'Logout', icon: <Logout />, action: handleLogout },
  ];

  const drawerItems = isAdmin ? drawerAdmin : userToken ? drawerUser : drawerGuest;
  const [openMenus, setOpenMenus] = useState({});

  const handleToggleMenu = (text) => {
    setOpenMenus((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  // Add this function inside your Navbar component
  const renderDrawerItems = (items, level = 0) => (
    <List sx={level > 0 ? { pl: 4 } : {}}>
      {items.map(({ text, icon, path, action, children }, idx) => {
        const hasChildren = Array.isArray(children) && children.length > 0;
        const key = typeof text === 'string' ? text + level + idx : `menu-item-${level}-${idx}`;
        return (
          <React.Fragment key={key}>
            <ListItem disablePadding>
              <ListItemButton
                component={path && !hasChildren ? RouterLink : 'button'}
                to={path && !hasChildren ? path : undefined}
                onClick={
                  hasChildren
                    ? (e) => {
                      e.stopPropagation();
                      handleToggleMenu(key);
                    }
                    : action
                }
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
                {hasChildren &&
                  (openMenus[key] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {hasChildren && openMenus[key] && renderDrawerItems(children, level + 1)}
          </React.Fragment>
        );
      })}
    </List>
  );
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Toolbar />
      {renderDrawerItems(drawerItems)}
    </Box>
  );
  return (
    <>
      <AppBar enableColorOnDark {...navBarProps}>
        <Toolbar sx={styles.toolbar}>
          {/* Left section: Drawer menu button (except for admin) */}
          {(
            (userToken && userInfo?.role === 'user') ||
            (userToken && userInfo?.role === 'admin' && isMobile) ||
            (!userToken)
          ) && (
              <Box sx={styles.leftSection}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}

          {/* Center section: Logo */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Link
              component={RouterLink}
              to={(userToken && userInfo && userInfo.role === 'admin') ? '/dashboard' : "/"}
              color="inherit"
              sx={styles.logoLink}
              underline="none"
            >
              {(userToken && userInfo && userInfo.role === 'admin') ? (
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: { xs: 700, md: 700 },
                    letterSpacing: 2,
                    color: '#fff',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    fontSize: { xs: '30px', md: '35px' },
                    fontFamily: '"42dot Sans", sans-serif !important',
                    display: 'inline-block',
                  }}
                >
                  Dashboard
                </Typography>
              ) : (
                <img src="/image/2.png" alt="Logo" style={styles.logoImg} />
              )}
            </Link>
          </Box>

          {/* Right section: Icons */}
          <Box sx={styles.rightSection}>
            {(userToken && userInfo && userInfo.role === 'user') && (
              <>
                <IconButton
                  sx={{ ...styles.iconBtn, ...styles.favoriteIcon }}
                  onClick={() => navigate('/favourite')}
                >
                  <Badge badgeContent={userCounts.favoritesCount} color="error" onClick={() => { navigate('/favourite') }}>
                    <Heart fontSize="small" />
                  </Badge>
                </IconButton>
                <IconButton
                  sx={{ ...styles.iconBtn, ...styles.cartIcon }}
                  onClick={() => navigate('/cart')}
                >
                  <Badge badgeContent={userCounts.cartCount} color="info" onClick={() => { navigate('/cart') }}>
                    <ShoppingCart fontSize="small" />
                  </Badge>
                </IconButton>
              </>
            )}
            <IconButton
              sx={{ ...styles.iconBtn, ...(userToken ? styles.logoutIcon : styles.accountIcon) }}
              onClick={() => {
                userToken ? logout() : navigate('/login');
              }}
            >
              {userToken ? <Logout fontSize="medium" /> : <AccountCircle fontSize="medium" />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer logic for admin dashboard */}
      {(userToken && userInfo && userInfo.role === 'admin') ? (
        isDesktop ? (
          <Drawer
            variant="permanent"
            open
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                top: 0,
                left: 0,
                zIndex: theme.zIndex.appBar - 1,
              }
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth
              }
            }}
          >
            {drawer}
          </Drawer>
        )
      ) : (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
}

export default Navbar;
