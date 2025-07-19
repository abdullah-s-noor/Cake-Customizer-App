import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
} from "@mui/material";
import Loader from "../../Loaders/Loader";
import { api } from "../../../api/api";
import { toast } from "react-toastify";

const MediaGrid = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [collectionName, setCollectionName] = useState("Cakes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const response = await api.get("/cake/system");
        const cakes = response?.data?.cakes || [];
        setMediaItems(cakes);

        if (cakes.length > 0 && typeof cakes[0].cakeCollection === "string") {
          const collectionId = cakes[0].cakeCollection;
          try {
            const res = await api.get(`/collections/${collectionId}`);
            setCollectionName(res.data?.collection?.name);
          } catch {
            toast.warn("⚠️ Could not fetch collection name");
          }
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.error?.message ||
          error?.response?.data?.message ||
          "Failed to fetch cakes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMediaItems();
  }, []);

  const handleStatusChange = async (cakeId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await api.patch(`/cake/${cakeId}/status`, { status: newStatus });
      setMediaItems((prev) =>
        prev.map((cake) =>
          cake._id === cakeId ? { ...cake, status: newStatus } : cake
        )
      );
      toast.success(`Cake status changed to ${newStatus}`);
    } catch {
      toast.error("Failed to change cake status");
    }
  };

  if (loading) return <Loader />;

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 5, md: 10, lg: 20 },
        py: 4,
        minHeight: "100vh",
      }}
    >
      <Box display="flex" justifyContent="center" mb={5}>
        <Typography
          variant="h3"
          component="div"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            fontWeight: "bold",
            px: 4,
            py: 1,
            borderRadius: 3,
            textAlign: "center",
            width: "fit-content",
          }}
        >
          {collectionName}
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {mediaItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
            <Card sx={{ borderRadius: 3, overflow: "hidden", height: "100%", position: "relative" }}>
              <Box display="flex" justifyContent="center" bgcolor="#f5f5f5">
                <CardMedia
                  component="img"
                  src={item.basecake?.secure_url}
                  alt={item.shape?.name || "Cake Image"}
                  sx={{
                    width: "100%",
                    maxWidth: 300,
                    height: 250,
                    objectFit: "cover",
                    p: 2,
                  }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {item.shape?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Flavor:{" "}
                  {item.flavor?.name
                    ? (() => {
                        const idx = item.flavor.name.indexOf("_");
                        return idx !== -1
                          ? item.flavor.name.slice(idx + 1)
                          : item.flavor.name;
                      })()
                    : ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Topping:{" "}
                  {item.topping?.name
                    ? (() => {
                        const idx = item.topping.name.indexOf("_");
                        return idx !== -1
                          ? item.topping.name.slice(idx + 1)
                          : item.topping.name;
                      })()
                    : ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {item.price} ₪
                </Typography>
                <Button
                  variant={item.status === "active" ? "contained" : "outlined"}
                  sx={{
                    mt: 2,
                    width: "100%",
                    fontWeight: "bold",
                    borderRadius: 2,
                  }}
                  onClick={() => handleStatusChange(item._id, item.status)}
                >
                  {item.status === "active" ? "Inactivate" : "Activate"}
                </Button>
                <Typography
                  variant="caption"
                  color={item.status === "active" ? "success.main" : "error.main"}
                  sx={{ display: "block", mt: 1, textAlign: "center" }}
                >
                  {item.status === "active" ? "Active" : "Inactive"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MediaGrid;
