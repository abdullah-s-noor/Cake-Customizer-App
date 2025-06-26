import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import Loader from "../Loaders/Loader";
import Theme from "../../../src/theme";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchFavourites = async () => {
  try {
    const response = await api.get("/favorite/");

    if (response?.data?.favorite?.cakes?.length) {
      setFavourites(response.data.favorite.cakes);
    } else {
      setFavourites([]);
      toast.info(response?.data?.message || "No favorites found.");
    }
  } catch{
    toast.error("Failed to load favourites.");
    setFavourites([]);
  } finally {
    setLoading(false);
  }
};



  const removeFavourite = async (cakeId) => {
    try {
      await api.post(`/favorite/remove/`, { id: cakeId });
      setFavourites((prev) => prev.filter((cake) => cake._id !== cakeId));
      toast.success("Removed from favourites.");
    } catch {
      toast.error("Failed to remove item.");
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
        <Box sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: Theme.palette.primary.main }}>
            Your Favourites
          </Typography>

          {favourites.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              You have no favourites yet.
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {favourites.map((cake) => (
                <Grid item xs={12} sm={6} md={4} key={cake._id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={cake.basecake?.secure_url}
                      alt="Cake"
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {cake.type?.toUpperCase() || "Cake"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ₪{cake.finalPrice || cake.price}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{ mt: 2, color: Theme.palette.primary.main, borderColor: Theme.palette.primary.main }}
                        onClick={() => removeFavourite(cake._id)}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </>
  );
}
