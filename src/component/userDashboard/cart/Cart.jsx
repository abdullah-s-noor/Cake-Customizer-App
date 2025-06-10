import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Button,
  Grid,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ConfDelete from "../../Conformation/ConfDelete";
import CakePreview from "../customCake/CakePreview";
import Loader from "../../Loaders/Loader";
import Theme from "../../../../src/theme";

export default function Cart() {
  document.title = "Cart";
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/data/getCart.json");

        // Add quantity to each item if it's not already present
        const itemsWithQuantity = data.items.map((item, index) => ({
          ...item,
          id: item.id || index + 1,
          quantity: item.quantity || 1,
        }));

        setCartItems(itemsWithQuantity);
      } catch (err) {
        toast.error("Failed to load cart items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleAdd = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleRemove = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = async () => {
    try {
      if (!itemToDelete) return;
      setCartItems((prev) => prev.filter((item) => item.id !== itemToDelete.id));
      toast.success("Item deleted successfully");
    } catch (err) {
      toast.error("Failed to delete item");
    } finally {
      setOpen(false);
      setItemToDelete(null);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <ConfDelete
        open={open}
        title="Delete Item"
        description="Are you sure you want to delete this item?"
        onClose={() => {
          setOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleDelete}
      />
      {
        loading ? (
          <Loader />
        ) : cartItems && cartItems.length > 0 ? (
          <Box maxWidth={900} mx="auto" p={3}>
            <Grid container justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Cart
              </Typography>
              <Typography variant="h6">{total} ₪</Typography>
            </Grid>

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

                <CakePreview
                  selectedShape={item.shape}
                  selectedFlavor={item.flavor}
                  selectedTopping={item.topping}
                  selectedColor={item.color}
                  value={3}
                  xs={150}
                  sm={150}
                  md={150}
                  b={40}
                />

                <Box flex={1} display="flex" alignItems="center">
                  <CardContent sx={{ py: 1, pl: 0 }}>
                    <Box display="flex" alignItems="center">
                      <Typography fontWeight="bold">
                        {item.shape?.name}
                      </Typography>
                      <Button onClick={() => navigate("/custom-cake")}>
                        <EditOutlinedIcon fontSize="small" sx={{ ml: 1, fontSize: 16 }} />
                      </Button>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.flavor?.name}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      {item.price} ₪
                    </Typography>
                  </CardContent>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center" pr={2}>
                  {/* Show Delete only when quantity is 1 */}
                  {item.quantity === 1 ? (
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(true);
                        setItemToDelete(item);
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleRemove(item.id)}>
                      <RemoveCircleIcon fontSize="small" color="primary" />
                    </IconButton>
                  )}

                  <Typography mx={1}>{item.quantity}</Typography>

                  <IconButton
                    onClick={() => handleAdd(item.id)}
                    disabled={item.quantity >= 4}
                  >
                    <AddCircleIcon fontSize="small" color="primary" />
                  </IconButton>
                </Box>

              </Card>
            ))}

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
                Place Order
              </Button>
            </Box>
          </Box>
        ) : (
          <Box textAlign="center" mt={5}>
            <Typography variant="h6" color="text.secondary">
              Cart is empty
            </Typography>
          </Box>
        )
      }
    </>
  );
}
