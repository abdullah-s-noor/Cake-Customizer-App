import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';

const CakePreview = ({ selectedShape: shape, selectedFlavor: flavor, selectedTopping: topping, selectedColor: color = null, value, xs = 240, sm = 280, md = 450, b = 50 }) => {

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs, sm, md },
        height: { xs, sm, md },
        margin: 'auto',
      }}
    >
      {/* Base Cake */}
      <Box
        component="img"
        src={shape?.image?.secure_url}
        alt="Cake Base"
        sx={{
          width: '100%',
          height: { xs: '100%', md: '70%' },
          objectFit: 'contain',
          position: 'absolute',
          left: 0,
        }}
      />

      {((!color) || (color && value == 1)) && flavor?.image?.secure_url && (
        <Box
          component="img"
          src={flavor.image.secure_url}
          alt={`Flavor - ${flavor.name || 'Layer'}`}
          sx={{
            width: { xs: '100%' },
            height: { xs: '100%', md: '70%' },
            objectFit: 'contain',
            position: 'absolute',
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}
      {/* Color Layer */}
      {((!flavor) || (color && value != 1)) && (
        <Box
          component="svg"
          viewBox={shape?.viewBox}
          sx={{
            width: '100%',
            height: { xs: '100%', md: '70%' },
            position: 'absolute',
            left: 0,
            mixBlendMode: color === '#ffffff' ? 'soft-light' : 'multiply',
          }}
        >
          <path
            d={shape?.d}
            fill={color || 'transparent'}
          />
        </Box>
      )}

      {(topping && value != 1) && (
        <Box
          component="img"
          src={topping.image.secure_url}
          alt={`topping - ${topping.name || 'Layer'}`}
          sx={{
            width: '100%',
            height: { xs: '100%', md: '70%' },
            objectFit: 'contain',
            position: 'absolute',
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
};

export default CakePreview;
