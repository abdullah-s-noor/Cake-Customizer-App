import { CheckCircleOutline } from '@mui/icons-material'
import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import React from 'react'

function ToppingTab({ toppings, selectedTopping, setSelectedTopping,handlePriceChange }) {

  const handleSelectedTopping = (topping) => {
    const oldPrice =selectedTopping?.price||0;
    setSelectedTopping(topping);
    const newPrice =topping?.price||0;
    handlePriceChange(oldPrice,newPrice);
  }
  
  return (
    <ImageList
      sx={{
        m: '1px',
        height: { xs: 360, sm: 500, md: 600 },
        overflowY: 'auto',
        margin: 0,
        pb: 3,
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
          backgroundColor: '#723d46',
        },
      }}
    >
      {toppings.map((item) => (
        <ImageListItem
          key={item._id}
          onClick={
            () => handleSelectedTopping(item)
          }
          sx={{
            cursor: 'pointer',
            borderRadius: 2,
            transition: '0.2s',
            position: 'relative',
            bgcolor: selectedTopping?._id === item?._id ? '#f6e6ec' : 'transparent',
          }}
        >
          {
            selectedTopping?._id === item?._id &&
            <CheckCircleOutline
            
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: '#723d46',
                background: '#fff',
                borderRadius: '50%',
              }}
            />
          }

          <img
                      srcSet={`${item.image.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.image.secure_url}?w=248&fit=crop&auto=format`}
                      alt={item.name}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      sx={{ textAlign: 'center' }}
                      title={item.name.split('_')[1]}
                      subtitle={
                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {item.price > 0 ? `+${item.price} ₪` : 'Free'}
                          </Typography>
                        </Box>
                      }
                      position="below"
                    />
            </ImageListItem>
            ))}
        </ImageList>
      )
}

      export default ToppingTab