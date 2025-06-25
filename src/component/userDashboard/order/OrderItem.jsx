import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Chip,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';

export default function OrderItem({ order }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.status || 'Pending');

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleCancel = () => {
    setStatus('Cancelled');
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Accepted':
        return 'success';
      case 'Shipped':
        return 'warning';
      case 'Rejected':
        return 'error';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Accordion expanded={expanded} onChange={handleToggle} sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Typography>Order #{order.id}</Typography>
          <Chip label={status} color={getStatusColor()} size="small" />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <List dense>
          {order.cakes.map((cake, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={cake.image}
                  alt={cake.name}
                  sx={{ width: 64, height: 64 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={cake.name}
                secondary={`Price: ${cake.price}`}
                sx={{ ml: 2, display: 'flex',justifyContent: 'space-between' }}
              />
            </ListItem>
          ))}
        </List>
        {status === 'Pending' && (
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Cancel Order
            </Button>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
