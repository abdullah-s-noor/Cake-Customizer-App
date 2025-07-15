import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import Loader from "../Loaders/Loader";
import Theme from "../../../src/theme";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Conformation from "../Conformation/ConfDelete";
import { UserContext } from "../context/User";
import { useNavigate } from "react-router-dom";


export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCakeId, setSelectedCakeId] = useState(null);
  const { userInfo, getUserCounts } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCardClick = (cakeId) => {
    navigate(`/cakeinformation/${cakeId}`, {
      state: { from: 'favorite' }
    }) // Change the path based on your routes
  };
  const fetchFavourites = async () => {
    try {
      const response = await api.get("/favorite/");
      if (response?.data?.favorites?.cakes?.length) {
        setFavourites(response.data.favorites.cakes);
      } else {
        setFavourites([]);
        toast.info(response?.data?.message || "No favorites found.");
      }
    } catch {
      toast.error("Failed to load favourites.");
      setFavourites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (cakeId) => {
    setSelectedCakeId(cakeId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.post(`/favorite/remove/`,
        {
          userId: userInfo._id,
          cakeId: selectedCakeId,
        }
      );
      await getUserCounts()

      setFavourites((prev) =>
        prev.filter((cake) => cake._id !== selectedCakeId)
      );

      toast.success("Removed from favourites.");
    } catch {
      toast.error("Failed to remove item.");
    } finally {
      setConfirmOpen(false);
      setSelectedCakeId(null);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            padding: { xs: 2, md: 6 },
            background: "#f8f9fa",
            minHeight: "100vh",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: Theme.palette.primary.main,
              fontWeight: "bold",
              letterSpacing: 1,
              mb: 4,
              textAlign: "center",
            }}
          >
            <FavoriteIcon
              sx={{
                color: Theme.palette.primary.main,
                mr: 1,
                verticalAlign: "middle",
              }}
            />
            Your Favourites
          </Typography>

          {favourites.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center">
              You have no favourites yet.
            </Typography>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {favourites.map((cake) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={cake._id}>
                  <Card
                    onClick={() => handleCardClick(cake._id)}
                    sx={{
                      borderRadius: 4,
                      boxShadow: 3,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.03)",
                        boxShadow: 6,
                        cursor: "pointer",
                      },
                      display: "flex",
                      flexDirection: "column",
                      height: 450,
                      width: "100%",
                      maxWidth: 520,
                      background: "#fff",
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        image={cake.basecake?.secure_url}
                        alt="Cake"
                        sx={{
                          objectFit: "contain",
                          width: "90%",
                          height: "90%",
                          maxHeight: 300,
                          borderRadius: 3,
                          background: "#fafafa",
                        }}
                      />
                      <IconButton
                        aria-label="remove from favourites"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleDeleteClick(cake._id);
                        }}
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          background: "#fff",
                          "&:hover": { background: "#ffeaea" },
                          zIndex: 2,
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>

                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {cake.shape?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                      >
                        Flavor:{" "}
                        {cake.flavor?.name?.split("_").slice(1).join("_") ||
                          "-"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                      >
                        Topping:{" "}
                        {cake.topping?.name?.split("_").slice(1).join("_") ||
                          "-"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={0.5}
                      >
                        Color:{" "}
                        <Box
                          component="span"
                          sx={{
                            display: "inline-block",
                            width: 16,
                            height: 16,
                            bgcolor: cake.color,
                            border: "1px solid #ccc",
                            borderRadius: "50%",
                            verticalAlign: "middle",
                            ml: 0.5,
                            mr: 1,
                          }}
                        />
                        {cake.color}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        Price: <b>₪{cake.finalPrice || cake.price}</b>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
      <Conformation
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove Favourite"
        content="Are you sure you want to remove this cake from your favourites?"
      />
    </>
  );
}
