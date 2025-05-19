import React, { useState } from "react";
import { Box, Typography, Grid, Button, Chip, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import RateandReview from "../RateandReview/RateandReview.jsx";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ffc107", // yellow stars
  },
  "& .MuiRating-iconHover": {
    color: "#ffb300",
  },
});

export default function CakeDetails() {
  const [userRating, setUserRating] = useState(4); // 🔹 Start with a default rating
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const cakeData = {
    name: "Deluxe Celebration Cake",
    Collections: "Birthday",
    image: "/image/da.png",
    description:
      "A delicious customizable cake for any occasion. Choose your favorite shape, flavor, topping, and color!",
    shape: "Square",
    flavour: "Chocolate",
    color: "Pink",
    topping: "Fresh Berries",
    price: "120₪",
    
  };

  return (
    <>
      <RateandReview open={open} onClose={handleClose} />

      <Box py={4} sx={{ px: { xs: 6, md: 2 }, maxWidth: 1200, mx: "auto" }}>
        <Grid container spacing={4}>
          {/* Left: Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={cakeData.image}
              sx={{ width: "100%", borderRadius: 2 }}
            />
          </Grid>

          {/* Right: Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" textAlign={"center"}>
              {cakeData.name}
            </Typography>
            {/* <Typography variant="h6" color="black" textAlign={"center"}>
            {cakeData.Collections}
          </Typography> */}

            <Typography variant="body2" color="text.secondary" mt={3}>
              {cakeData.description}
            </Typography>
            <Box display="flex" justifyContent="end" mt={2}>
              <StyledRating
                name="user-rating"
                value={userRating}
                precision={0.5}
                onChange={(event, newValue) => {
                  setUserRating(newValue);
                }}
              />
            </Box>

            {/* Cake Options */}

            <Box mt={6} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Shape:
              </Typography>
              <Chip label={cakeData.shape} />
            </Box>

            <Box mt={3} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Flavour:
              </Typography>
              <Chip label={cakeData.flavour} color="primary" />
            </Box>

            <Box mt={3} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Color:
              </Typography>
              <Chip
                label={cakeData.color}
                sx={{
                  backgroundColor: cakeData.color.toLowerCase(),
                  color: "#fff",
                }}
              />
            </Box>

            <Box mt={3} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Topping:
              </Typography>
              <Chip label={cakeData.topping} />
              <Typography>{cakeData.topping}</Typography>
            </Box>
            <Box mt={3} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Price:
              </Typography>
                
              <Chip label={cakeData.price} />

             </Box>
            {/* ⭐ User Rating */}
            <Box mt={3} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Review:
              </Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpen(true)}
                sx={{ ml: 1 }}
              >
                Write Review
              </Button>
              {/* <Typography variant="body2" color="text.secondary">
              ({cakeData.reviews} reviews)
            </Typography> */}
            </Box>

            <Box mt={3} display="flex" justifyContent={"space-between"} gap={3}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  backgroundColor: "#e0bfbf",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  backgroundColor: "#e0bfbf",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                Edit Cake
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
