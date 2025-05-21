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
  // const [userRating, setUserRating] = useState(4); // 🔹 Start with a default rating
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const reviews = [
    {
      cakeid:1,
      userid: 1,
      user: "Alice",
      rating: 4,
      comment: "Delicious cake! Highly recommend.",
    },
    {
      cakeid:1,
      userid: 2,
      user: "Bob",
      rating: 3,
      comment: "Good, but a bit too sweet for my taste.",
    },
    {
      cakeid:1,
      userid: 3,
      user: "Charlie",
      rating: 5,
      comment: "Absolutely loved it! Perfect for my birthday.",
    },
  ];
  const cakeData = {
    id:"111111111111111111111111",
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
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;


  return (
    <>
      <RateandReview open={open} onClose={handleClose} cakeId={cakeData.id}   />

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
            <Typography variant="body2" color="text.secondary" mt={3}>
              {cakeData.description}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt={2}
              gap={1}
            >
              <StyledRating
                name="avg-rating"
                value={Number(avgRating)}
                precision={0.5}
                readOnly
                size="medium"
              />
              <Typography variant="subtitle2" color="text.secondary">
                {avgRating} / 5
              </Typography>
            </Box>

            {/* Cake Options */}

            <Box mt={6} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Shape:
              </Typography>
              <Typography>{cakeData.shape}</Typography>
            </Box>

            <Box mt={4} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Flavour:
              </Typography>
              <Typography>{cakeData.flavour}</Typography>
            </Box>

            <Box mt={4} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Color:
              </Typography>
                            <Typography>{cakeData.color}</Typography>

            </Box>

            <Box mt={4} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Topping:
              </Typography>
              <Typography>{cakeData.topping}</Typography>
            </Box>
            <Box mt={4} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Price:
              </Typography>
              <Typography color={"#42a5f5"} fontWeight={"bold"}>{cakeData.price}</Typography>
            </Box>
            {/* ⭐ User Rating */}
            <Box mt={4} display="flex" justifyContent={"space-between"}>
              <Typography variant="subtitle2" fontWeight="bold">
                Review:
              </Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpen(true)}
                sx={{color: "#42a5f5", borderColor: "#42a5f5", fontWeight: "bold"}}
               
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
                  backgroundColor:"#42a5f5",
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
                  backgroundColor: "#42a5f5",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                Edit Cake
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Customer Reviews
          </Typography>
          {reviews.length === 0 ? (
            <Typography color="text.secondary">No reviews yet.</Typography>
          ) : (
            reviews.map((review) => (
              <Box
                key={review.id}
                mb={2}
                p={2}
                sx={{ background: "#f9f9f9", borderRadius: 2 }}
              >
                <Box display="flex" gap={2}>
                  <Typography fontWeight="bold" mb="20px">
                    {review.user}
                  </Typography>
                  <StyledRating
                    value={review.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </>
  );
}
