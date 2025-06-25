import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import OrderItem from './OrderItem';

const mockOrders = [
  {
    id: 1,
    status: 'Shipped',
    cakes: [
      { name: 'Chocolate Cake', image: '/images/chocolate.jpg', price: '$25' },
      { name: 'Vanilla Cake', image: '/images/vanilla.jpg', price: '$20' },
      { name: 'Red Velvet Cake', image: '/images/redvelvet.jpg', price: '$30' },
    ],
  },
  {
    id: 2,
    status: 'Accepted',
    cakes: [
      { name: 'Strawberry Cheesecake', image: '/images/strawberry.jpg', price: '$28' },
      { name: 'Carrot Cake', image: '/images/carrot.jpg', price: '$22' },
    ],
  },
];

export default function OrderPage() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Your Orders
        </Typography>
        {mockOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </Box>
    </Container>
  );
}
