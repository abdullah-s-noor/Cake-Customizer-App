import React, { useContext, useEffect, useState } from "react";
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
import theme from "../../../../src/theme";
import { api } from "../../../api/api"
import { UserContext } from "../../context/User";
export default function Cart() {
  document.title = "Cart";
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(UserContext);
  const [savingItemId, setSavingItemId] = useState(null);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const {getUserCounts}=useContext(UserContext)
  const handleSaveQuantity = async (item) => {
    try {
      setSavingItemId(item.id);

      const payload = {
        cakeId: item.cake._id,
        userId: userInfo._id,
        quantity: item.quantity,
      };

      await api.patch('/cart/update-quantity', payload);
      toast.success("Quantity updated");

      setCartItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id ? { ...i, originalQuantity: i.quantity } : i
        )
      );
    } catch (err) {
      toast.error("Failed to update quantity");
      console.error(err);
    } finally {
      setSavingItemId(null);
    }
  };


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await api.get('/cart')
        // Add quantity to each item if it's not already present
        const itemsWithQuantity = data.cart.items.map((item) => ({
          ...item,
          id: item._id, // cart item ID
          quantity: item.quantity || 1,
          originalQuantity: item.quantity || 1, // used for comparison
        }));
        console.log(itemsWithQuantity)
        setCartItems(itemsWithQuantity);
      } catch (err) {
        toast.error("Failed to load cart items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [navigate, location]);

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
    if (!itemToDelete) return;
    try {
      setDeletingItemId(itemToDelete.id);

      const payload = {
        cakeId: itemToDelete.cake._id,
        userId: userInfo._id
      };

      await api.post('/cart/remove', payload);
      await getUserCounts()


      setCartItems((prev) =>
        prev.filter((item) => item.id !== itemToDelete.id)
      );
      
      toast.success("Item deleted successfully");
    } catch (err) {
      toast.error("Failed to delete item");
      console.error(err);
    } finally {
      setDeletingItemId(null);
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
        loading={Boolean(deletingItemId)}
      />

      {
        loading ? (
          <Loader />
        ) : cartItems && cartItems.length > 0 ? (
          <Box maxWidth={900} mx="auto" p={{ xs: 1, sm: 3 }}>
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

                <Box display="flex" alignItems="center" pl={1} pr={{ xs: 1, sm: 4 }}>
                  {/* Show normal image */}
                  <Box
                    component="img"
                    src={item.cake.basecake?.secure_url || "/image/testCake/2.png"}
                    alt={item.cake.topping?.name?.split('_')[1] || "Cake"}
                    sx={{ width: { xs: 68, sm: 140 }, transform: "translateY(-10%)" }}
                  />

                </Box>
                <Box flex={1} display="flex" alignItems="center" >
                  <CardContent sx={{ py: 1, pl: 0, pr: 0 }}>
                    <Box display="flex" sx={{ fontSize: '10px' }}>
                      <Typography fontWeight="bold" sx={{ fontSize: { xs: '14', sm: '20px' } }}>
                        {item.cake.topping?.name.split('_')[1]}
                      </Typography>
                      <Button
                        onClick={() =>
                          navigate(`/cakeinformation/${item.cake._id}`, {
                            state: { from: 'cart' }
                          })
                        }
                        sx={{ p: 0 }}>
                        <EditOutlinedIcon fontSize="small" sx={{ ml: 0, fontSize: 16 }} />
                      </Button>

                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '10', sm: '15px' } }}>
                      {item.cake.flavor?.name.split('_')[1]}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      {item.cake.finalPrice} ₪
                    </Typography>
                  </CardContent>
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" pr={2}>
                  <Box display="flex" alignItems="center">
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

                  {/* Save button */}
                  {item.quantity !== item.originalQuantity && (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ mt: 1, fontSize: "12px", textTransform: 'none' }}
                      onClick={() => handleSaveQuantity(item)}
                      disabled={savingItemId === item.id}
                    >
                      {savingItemId === item.id ? "Saving..." : "Save"}
                    </Button>
                  )}

                </Box>


              </Card>
            ))}

            {/* Continue Button */}
            <Box mt={4}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background: theme.palette.primary.main,
                  color: "#fff",
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
