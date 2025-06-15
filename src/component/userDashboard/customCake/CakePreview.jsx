import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';

const CakePreview = ({ selectedShape: shape, selectedFlavor: flavor, selectedTopping: topping, selectedColor: color=null,value ,xs= 240, sm= 280, md= 450,b=50}) => {
useEffect(() => {
  console.log(color);
},[]);
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
      <img
        src={shape?.image?.secure_url}
        alt="Cake Base"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          position: 'absolute',
          bottom: b,
          left: 0,
        }}
      />

      {/* Flavor Layer */}
      
      {((!color)||(color&&value==1))&&flavor?.image?.secure_url && (
        <img
          src={flavor.image.secure_url}
          alt={`Flavor - ${flavor.name || 'Layer'}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute',
            bottom: b,
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}
      {/* Color Layer */}
      {((!flavor)||(color&&value!=1)) && (
        <svg
          viewBox={shape?.viewBox}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: b,
            left: 0,
             mixBlendMode: color === '#ffffff' ? 'soft-light' : 'multiply',
            
          }}
        >
          <path
            d={shape?.d}
            fill={color || 'transparent'}
            
          />
        </svg>
      )}
      {/* Topping Layer */}
      
      {(topping&&value!=1) && (
        <img
          src={topping.image.secure_url}
          alt="Topping Layer"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute',
            bottom: b,
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
};

export default CakePreview;
