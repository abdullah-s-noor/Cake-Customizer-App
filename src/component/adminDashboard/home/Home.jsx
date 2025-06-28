import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider, Container } from '@mui/material';

const Dashboard = () => {
    const cards = [
    {
      title: 'Orders',
      subtitle: "Today's Orders: 5\nPending Orders: 2",
    },
    
    {
      title: 'User Management',
      subtitle: 'Total Users: 10\nNew Signups: 3',
    },
    {
      title: 'Reviews',
      subtitle: 'New Reviews: 4\nAverage Rating: 4.0★',
    },
  ];

return (
  <Box sx={{ bgcolor: 'background.default', color: 'primary.main', minHeight: '100vh', py: 5 }}>
    <Container>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Admin Dashboard
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4} display="flex" justifyContent="center">
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={3}
              sx={{
                width: 300,
                height: 200,
                boxShadow: '10px 10px 10px rgba(44, 41, 41, 0.32)',
              }}
            >
              <CardContent
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: "primary.main" }} >
                  {card.title}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line', color: "primary.main" }}>
                  {card.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);
};

export default Dashboard;
