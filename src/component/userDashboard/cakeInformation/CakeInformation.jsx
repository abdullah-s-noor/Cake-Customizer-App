import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import RateandReview from '../RateandReview/RateandReview';
import CakePreview from '../customCake/CakePreview';
import { Cake } from '@mui/icons-material';
import Theme from "../../../../src/theme.js";
import { api } from '../../../api/api.js';
import { UserContext } from '../../context/User';
import { toast } from 'react-toastify';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffc107',
  },
  '& .MuiRating-iconHover': {
    color: '#ffb300',
  },
});

export default function CakeDetails() {
  const { userToken, userInfo } = useContext(UserContext)
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    cakeId: null,
    shape: null,
    flavor: null,
    topping: null,
    color: null,
    file: null,
    cakeMessage: null,
    instructions: null,
    price: 0,
  });

  /** Authorization: if no state, you are not allowd to preview this component */
  useEffect(() => {
    const passedState = location?.state?.orderDetails;
    const isEdit = location?.state?.isEdit;

    if (passedState) {
      setOrderDetails(passedState);
      setIsEditMode(!!isEdit);
    } else {
      toast.warn('No cake information provided.');
      navigate('/custom-cake');
    }
  }, [location]);


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


  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  const handleCart = async () => {
    if (!userToken) {
      toast.warn("You need to log in before adding to cart.");
      navigate('/login', { state: { from: location, orderDetails }, replace: true });
      return;
    }
    const [x, y, width, height] = orderDetails.shape.viewBox.split(' ').map(Number);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    try {
      // 1. Draw shape base
      const shapeImg = await loadImage(orderDetails.shape.image.secure_url);
      ctx.drawImage(shapeImg, 0, 0, width, height);

      // 2. Draw color if provided
      if (orderDetails.color && orderDetails.shape.d) {
        const path = new Path2D(orderDetails.shape.d);

        ctx.save();
        ctx.clip(path); // only color inside shape
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = orderDetails.color;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        ctx.globalCompositeOperation = 'source-over';
      } else if (orderDetails.flavor?.image?.secure_url) {
        // 3. If no color, draw flavor
        const flavorImg = await loadImage(orderDetails.flavor.image.secure_url);
        ctx.drawImage(flavorImg, 0, 0, width, height);
      }

      // 4. Draw topping if exists
      if (orderDetails.topping?.image?.secure_url) {
        const toppingImg = await loadImage(orderDetails.topping.image.secure_url);
        ctx.drawImage(toppingImg, 0, 0, width, height);
      }

      // 5. Convert to blob and submit
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      if (blob) {
        const file = new File([blob], 'custom-cake.png', { type: 'image/png' });
        const formData = new FormData();
        formData.append('shape', orderDetails.shape._id);
        formData.append('flavor', orderDetails.flavor._id);
        formData.append('topping', orderDetails.topping._id);
        formData.append('color', orderDetails.color);
        if (orderDetails.file) {
          formData.append('file', orderDetails.file);
        }
        formData.append('cakeMessage', orderDetails.cakeMessage);
        formData.append('instructions', orderDetails.instructions);
        formData.append('type', 'system');
        formData.append('basecake',file );
        // Open the generated file in a new window
        console.log(1232214421241)
        formData.forEach((value, key) => {
          console.log(`${key}:`, value);
        });
        if (isEditMode && orderDetails.cakeId) {
          await api.put(`/cake/custom/${orderDetails.cakeId}`, formData);
          toast.success('Cake updated successfully!');
        } else {
          const { data } = await api.post('/cake/custom/new', formData);
          console.log(data.cake)
          const fileURL = window.URL.createObjectURL(file);
          window.open(fileURL, '_blank');
          const payload = {
            userId: userInfo._id,
            cakeId: data.cake,
            quantity: 1
          };
          
          await api.post('/cart/add', payload);
          toast.success('Custom cake added to cart successfully!');
        }
        toast.success('Custom cake added to cart successfully!');
        const url = URL.createObjectURL(file);
        window.open(url);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add cake to cart.");

    }

  };














  return (
    <>

      <RateandReview open={open} onClose={handleClose} cakeId={orderDetails?.shape?._id || 'unknown'} />

      <Box py={4} sx={{ px: { xs: 6, md: 2 }, maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{mx:'auto'}}>
            <CakePreview
              selectedShape={orderDetails.shape}
              selectedFlavor={orderDetails.flavor}
              selectedTopping={orderDetails.topping}
              selectedColor={orderDetails.color}
              value={2}
            />

          </Grid>

          <Grid item xs={12} md={6} sx={{mx:'auto'}}>
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
              <Typography>{orderDetails?.flavor?.name.split('_')[1]}</Typography>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">Color:</Typography>
              <Box sx={{ width: 24, height: 24, bgcolor: orderDetails?.color, borderRadius: '50%' }} />
              {!orderDetails.color && <Typography variant="subtitle2" fontWeight="bold">None</Typography>}
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">Topping:</Typography>
              <Typography>{orderDetails?.topping?.name.split('_')[1]}</Typography>
            </Box>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">Price:</Typography>
              <Typography sx={{ color: Theme.palette.primary.main }} variant="subtitle2" fontWeight="bold">
                {orderDetails?.price} ₪
              </Typography>
            </Box>

            <Box mt={4} display="flex" justifyContent="space-between">
              <Typography variant="subtitle2" fontWeight="bold">Review:</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setOpen(true)}
                sx={{ color: Theme.palette.primary.main, borderColor: Theme.palette.primary.main, fontWeight: 'bold' }}
              >
                Write Review
              </Button>
            </Box>

            <Box mt={3} display="flex" justifyContent="space-between" gap={3}>
              <Button
                variant="contained"
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold', backgroundColor: Theme.palette.primary.main, color: 'white', borderRadius: 2 }}
                onClick={handleCart}
              >
                {isEditMode ? 'Update Cake in Cart' : 'Add to Cart'}
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ py: 1.5, fontWeight: 'bold', backgroundColor: Theme.palette.primary.main, color: 'white', borderRadius: 2 }}
                onClick={() => navigate('/custom-cake', { state: { orderDetails } })} // Navigate back to custom cake creation
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
