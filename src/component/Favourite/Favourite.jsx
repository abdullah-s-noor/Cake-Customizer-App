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
    if (
      response.data &&
      Array.isArray(response.data.favourites) &&
      response.data.favourites.length > 0
    ) {
      setFavourites(response.data.favourites);
    } else if (Array.isArray(response.data) && response.data.length > 0) {
      setFavourites(response.data);
    } else {
      setFavourites([]);   
      if (response.data && response.data.message) {
        toast.info(response.data.message);
      }
    }
  } catch {
    toast.error("Failed to load favourites.");
  } finally {
    setLoading(false);
  }
};

  const removeFavourite = async (id) => {
    try {
      await api.post(`/favorite/remove/`, { id });
      setFavourites((prev) => prev.filter((item) => item.id !== id));
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
              {favourites.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card>
                    {item.image && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.title}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{ mt: 2, color: Theme.palette.primary.main, borderColor: Theme.palette.primary.main }}
                        onClick={() => removeFavourite(item.id)}
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
