import React from 'react';
import { Box, Button } from '@mui/material';

const CakePreview = ({ selectedShape: shape, selectedFlavor: flavor, selectedTopping: topping, selectedColor: color, }) => {

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 240, sm: 280, md: 450 },
        height: { xs: 240, sm: 280, md: 450 },
        margin: 'auto',
      }}
    >
      {/* Base Cake */}
      <img
        src={shape?.image?.secure_url}
        alt="Cake Base"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          position: 'absolute',
          bottom: '50px',
          left: 0,
        }}
      />

      {/* Flavor Layer */}
      
      {!(flavor&&color)&&flavor?.image?.secure_url && (
        <img
          src={flavor.image.secure_url}
          alt={`Flavor - ${flavor.name || 'Layer'}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute',
            bottom: '50px',
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}
      {/* Color Layer */}
      {color && (
        <svg
          viewBox={shape?.viewBox}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: '50px',
            left: 0,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}
        >
          <path
            d={shape?.d}
            fill={color}
            
          />
        </svg>
      )}
      {/* Topping Layer */}
      {topping && (
        <img
          src={topping.image.secure_url}
          alt="Topping Layer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute',
            bottom: '50px',
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
};

export default CakePreview;
