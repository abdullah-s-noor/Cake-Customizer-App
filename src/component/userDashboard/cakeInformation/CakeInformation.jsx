import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import RateandReview from '../RateandReview/RateandReview';
import CakePreview from '../customCake/CakePreview';
import { Cake } from '@mui/icons-material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffc107',
  },
  '& .MuiRating-iconHover': {
    color: '#ffb300',
  },
});

export default function CakeDetails() {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({
    shape: null,
    flavor: null,
    topping: null,
    color: null,
    file:null,
    cakeMessage:null,
    instructions:null,
    price:0,
  });

  /** Authorization: if no state, you are not allowd to preview this component */
  useEffect(() => {
    
    if (!location.state || !location.state.orderDetails) {
      navigate('/custom-cake');
    }
    console.log(orderDetails);
    setOrderDetails(location?.state?.orderDetails)

  }, [])


  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const reviews = [
    { user: 'Alice', rating: 4, comment: 'Delicious cake! Highly recommend.' },
    { user: 'Bob', rating: 3, comment: 'Good, but a bit too sweet for my taste.' },
    { user: 'Charlie', rating: 5, comment: 'Absolutely loved it! Perfect for my birthday.' },
  ];

  const avgRating =
    reviews.length > 0
      ? (
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      ).toFixed(1)
      : 0;

  return (
    <>
    
      <RateandReview open={open} onClose={handleClose} cakeId={orderDetails?.shape?._id || 'unknown'} />

      <Box py={4} sx={{ px: { xs: 6, md: 2 }, maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CakePreview
              selectedShape={orderDetails.shape}
              selectedFlavor={orderDetails.flavor}
              selectedTopping={orderDetails.topping}
              selectedColor={orderDetails.color}
              value={2}
            />

          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Customized Cake
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={3}>
              A delicious customizable cake for any occasion. Choose your favorite shape, flavor, topping, and color!
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="end" mt={2} gap={1}>
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

            <Box mt={6} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">Shape:</Typography>
              <Typography>{orderDetails?.shape?.name}</Typography>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">Flavor:</Typography>
              <Typography>{orderDetails?.flavor?.name}</Typography>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">Color:</Typography>
              <Box sx={{ width: 24, height: 24, bgcolor: orderDetails?.color, borderRadius: '50%' }} />
              {!orderDetails.color && <Typography variant="subtitle2" fontWeight="bold">None</Typography>}
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">Topping:</Typography>
              <Typography>{orderDetails?.topping?.name}</Typography>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">Price:</Typography>
              <Typography color="#723d46" fontWeight="bold">
                {orderDetails?.price} ₪
              </Typography>
            </Box>

            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">Review:</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpen(true)}
                sx={{ color: '#723d46', borderColor: '#723d46', fontWeight: 'bold' }}
              >
                Write Review
              </Button>
            </Box>

            <Box mt={3} display="flex" justifyContent="space-between" gap={3}>
              <Button
                variant="contained"
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold', backgroundColor: '#723d46', color: 'white', borderRadius: 2 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold', backgroundColor: '#723d46', color: 'white', borderRadius: 2 }}
                onClick={() => navigate('/custom-cake', { state: {orderDetails} })} // Navigate back to custom cake creation
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
            reviews.map((review, idx) => (
              <Box key={idx} mb={2} p={2} sx={{ background: '#f9f9f9', borderRadius: 2 }}>
                <Box display="flex" gap={2}>
                  <Typography fontWeight="bold">{review.user}</Typography>
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
