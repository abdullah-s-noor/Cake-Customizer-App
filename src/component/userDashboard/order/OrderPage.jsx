import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { api } from "../../../api/api.js";
import Loader from "../../Loaders/Loader";
import { toast } from "react-toastify";
import OrderItem from "./OrderItem";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/order/user-orders"); // 👈 Adjust endpoint if needed
      if (res?.data?.orders) {
        setOrders(res.data.orders);
      } else {
        toast.info(res?.data?.message || "No orders found.");
        setOrders([]);
      }
    } catch {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loader />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders yet.</Typography>
      ) : (
        orders.map((order) => (
          <OrderItem key={order._id || order.id} order={order} />
        ))
      )}
    </Box>
  );
}
