import React, { useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import {toast} from "react-toastify"
import { api } from "../../../api/api";
import Loader from "../../Loaders/Loader";

export default function OrderItem({ order }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState(order.status || "Pending");
  const[loading,setLoading]=useState(false)
  const handleToggle = () => {
    setExpanded(!expanded);
  };
 const handleCancel = async () => {
    setLoading(true);
    try {
      await api.post(`/order/cancel`, { orderId: order._id });
      setStatus("cancelled");
      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to cancel order"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "Accepted":
        return "success";
      case "pending":
        return "warning";
      case "Rejected":
        return "error";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };
    if(loading)return <Loader/>

  return (
    <Accordion expanded={expanded} onChange={handleToggle} sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography>Order #{order._id}</Typography>
          <Chip label={status} color={getStatusColor()} size="small" />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <List dense>
          {(order.items || []).map((item, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={item.cake?.basecake?.secure_url}
                  alt={item.cake?._id}
                  sx={{ width: 64, height: 64 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`Cake ID: ${item.cake?._id}`}
                secondary={`Price: ${item.cake?.finalPrice} | Quantity: ${item.quantity}`}
                sx={{ ml: 2, display: "flex", justifyContent: "space-between" }}
              />
            </ListItem>
          ))}
        </List>
        {status === "pending" && (
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
