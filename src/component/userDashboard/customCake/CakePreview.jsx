import React from 'react';
import { Box } from '@mui/material';

const CakePreview = ({
  baseType = 'base',
  flavor = null,
  topping = null,
  color = null, // Frosting color
}) => {
  const basePath = '/image/shape';

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 240, sm: 280, md: 380 },
        height: { xs: 240, sm: 280, md: 380 },
        margin: 'auto',
      }}
    >
      {/* Base Cake */}
      <img
        src={`${basePath}/${baseType}.png`}
        alt="Cake Base"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {/* Flavor Layer */}
      {flavor?.image?.secure_url && (
        <img
          src={flavor.image.secure_url}
          alt={`Flavor - ${flavor.name || 'Layer'}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Frosting Color Overlay */}
      {color && (
        <svg
          viewBox="0 0 1030 1190"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
          }}
        >
          <path
            d="M232 747.791C232 741.058 233.872 734.463 238.804 729.879C257.907 712.124 323.925 669.5 517.5 669.5C688.447 669.5 758.448 702.741 785.096 722.741C796.175 731.056 799.949 744.783 799.852 758.636L798.093 1009.68C798.032 1018.43 795.732 1027.1 789.098 1032.82C768.26 1050.75 703.014 1087 516 1087C333.199 1087 265.659 1052.37 242.724 1034.05C234.766 1027.7 232 1017.66 232 1007.47V747.791Z"
            fill={color}
            opacity="0.7"
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
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
};

export default CakePreview;
