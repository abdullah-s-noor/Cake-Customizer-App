import React, { useEffect, useState } from 'react';
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { CheckCircleOutline } from '@mui/icons-material';

const ToppingTab = ({ onSelect, shape, selectedId, onSelectId }) => {
  const [toppings, setToppings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchToppings = async () => {
    try {
      const res = await axios.get('/data/toppings.json');
      setToppings(res.data.items);
    } catch (err) {
      console.error('Failed to load toppings', err);
      setError('Unable to load toppings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getToppingForShape = async (topping) => {
    try {
      // const res = await axios.get(`/api/topping-by-shape?shapeId=${shape._id}&toppingId=${topping._id}`);
      const res = await axios.get('/data/selectedTopping.json'); // simulated
      const matched = res.data.items[0];
      onSelect?.(matched);
    } catch (err) {
      console.error('Failed to fetch topping by shape', err);
    }
  };

  useEffect(() => {
    fetchToppings();
  }, []);

  if (loading) {
    return <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <ImageList
      sx={{
        m: '1px',
        height: { xs: 360, sm: 500, md: 600 },
        overflowY: 'auto',
        margin: 0,
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: '8px',
          backgroundColor: '#e7e7e7',
          border: '1px solid #cacaca',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '8px',
          backgroundColor: '#42a5f5',
        },
      }}
    >
      {toppings.map((topping) => (
        <ImageListItem
          key={topping._id}
          onClick={() => {
            onSelectId?.(topping._id);
            getToppingForShape(topping);
          }}
          sx={{
            cursor: 'pointer',
            bgcolor: selectedId === topping._id ? '#e3f2fd' : 'transparent',
            borderRadius: 2,
            transition: '0.2s',
            position: 'relative',
          }}
        >
          {selectedId === topping._id && (
            <CheckCircleOutline
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#42a5f5',
                background: '#fff',
                borderRadius: '50%',
              }}
            />
          )}

          <img
            srcSet={`${topping.image.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${topping.image.secure_url}?w=248&fit=crop&auto=format`}
            alt={topping.name}
            loading="lazy"
          />
          <ImageListItemBar
            sx={{ textAlign: 'center' }}
            title={topping.name}
            subtitle={
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {topping.price > 0 ? `+${topping.price} ₪` : 'Free'}
                </Typography>
              </Box>
            }
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ToppingTab;
