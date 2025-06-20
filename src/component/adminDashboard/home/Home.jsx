import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminManageOrders from '../Admin_Manage/AdminManageOrders';
import AdminManageUsers from '../Admin_Manage/AdminManageUsers';
import AdminManageCollections from '../Admin_Manage/AdminManageCollections';

const Dashboard = () => {
  const navigate = useNavigate();

  const tabs = [
    'Dashboard',
    'Orders',
    'Menu',
    'Inventory',
    'Delivery',
    'Finance',
    'Users',
    'Reviews',
    'Settings',
  ];

  const cards = [
    {
      title: 'Orders',
      subtitle: "Today's Orders: 156\nPending Orders: 23",
      button: 'View Orders',
      route: AdminManageOrders,
    },
    {
      title: 'Menu Management',
      subtitle: 'Total Items: 245\nCategories: 12',
      button: 'Manage Menu',
      route: '/menu',
    },
    {
      title: 'Kitchen Inventory',
      subtitle: 'Low Stock Items: 9\nTotal Items: 156',
      button: 'Check Inventory',
      route: '/inventory',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#121212', color: '#fff', minHeight: '100vh', p: 3 }}>
      <Grid container spacing={2}>
        {/* Vertical Tabs */}
        <Grid item xs={12} sm={3} md={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {tabs.map((label, i) => (
              <Box
                key={i}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: '4px',
                  bgcolor: label === 'Dashboard' ? '#9c27b0' : 'transparent',
                  color: label === 'Dashboard' ? '#fff' : '#aaa',
                  fontWeight: 500,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#333',
                  },
                }}
              >
                {label}
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Dashboard Content */}
        <Grid item xs={12} sm={9} md={10}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          <Grid container spacing={2}>
            {cards.map((card, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ backgroundColor: '#1e1e1e', color: '#fff', minHeight: 140 }}>
                  <CardContent>
                    <Typography variant="h6">{card.title}</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 1 }}>
                      {card.subtitle}
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() => navigate(card.route)}
                    >
                      {card.button}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
