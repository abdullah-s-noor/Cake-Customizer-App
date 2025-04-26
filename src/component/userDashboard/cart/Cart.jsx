import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const Logo = "/image/da.png"; // Replace with actual image path

const cartItems = [
  {
    id: 1,
    name: "Graduation Topping",
    flavor: "Choco Crunch",
    price: 120,
    quantity: 1,
    img: Logo, // Replace with actual image
  },
  {
    id: 2,
    name: "Football Topping",
    flavor: "Red Velvet",
    price: 100,
    quantity: 1,
    img: Logo, // Replace with actual image
  },
];

export default function Cart() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box
      maxWidth={800}
      mx="auto"
      p={3}
      sx={{ fontFamily: "Arial, sans-serif" }}
    >
      {/* Cart Header */}
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Cart
        </Typography>
        <Typography variant="h6">{total} ₪</Typography>
      </Grid>

      {/* Items */}
      {cartItems.map((item) => (
        <Card
          key={item.id}
          sx={{
            display: "flex",
            mb: 2,
            boxShadow: "none",
            border: "1px solid #eee",
            borderRadius: 2,
          }}
        >
          <CardMedia
            component="img"
            image={item.img}
            alt={item.name}
            sx={{
              width: 150,
              height: 150,
              borderRadius: 2,
              m: 2,
              objectFit: "cover",
            }}
          />
          <Box flex={1} display="flex" alignItems="center">
            <CardContent sx={{ py: 1, pl: 0 }}>
              <Box display="flex" alignItems="center">
                <Typography fontWeight="bold">{item.name}</Typography>
                <EditOutlinedIcon
                  fontSize="small"
                  sx={{ ml: 1, fontSize: 16 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {item.flavor}
              </Typography>
              <Typography variant="body2" mt={1}>
                {item.price} ₪
              </Typography>
            </CardContent>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pr={2}
          >
            <IconButton color="inherit" size="small">
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <AddCircleIcon fontSize="small" color="primary" />
            </IconButton>
            <Typography>{item.quantity}</Typography>
          </Box>
        </Card>
      ))}

      {/* Card Message */}
      <Box mt={4}>
        <Typography fontWeight="bold" mb={1}>
          Card Message
        </Typography>
        <Box
          bgcolor="#F9DADA"
          p={2}
          borderRadius={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2">
            There’s no card message included with your order
          </Typography>
          <Button variant="text" sx={{ textTransform: "none" }}>
            Add Card Message
          </Button>
        </Box>
      </Box>

      {/* Continue Button */}
      <Box mt={4}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            background: "linear-gradient(to right, #f7e4e4, #e0bfbf)",
            color: "#000",
            fontWeight: "bold",
            borderRadius: 2,
            textTransform: "none",
            py: 1.5,
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}