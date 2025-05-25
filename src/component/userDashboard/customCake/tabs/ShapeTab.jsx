import { CheckCircleOutline } from '@mui/icons-material';
import { Box, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

function ShapeTab({ shapes, selectedShape, setSelectedShape, setFlavorFlag }) {
useEffect(() => {
    setFlavorFlag(false);
}, [setFlavorFlag]);
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
        {shapes.map((item) => (
            <ImageListItem
                key={item._id}
                onClick={
                    () => setSelectedShape(item)
                }
                sx={{
                    cursor: 'pointer',
                    borderRadius: 2,
                    transition: '0.2s',
                    position: 'relative',
                    bgcolor: selectedShape._id === item._id ? '#e3f2fd' : 'transparent',
                }}
            >
                {
                    selectedShape._id === item._id &&
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
                }

                <img
                    srcSet={`${item.image.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.image.secure_url}?w=248&fit=crop&auto=format`}
                    alt={item.name}
                    loading="lazy"
                />
                <ImageListItemBar
                    sx={{ textAlign: 'center' }}
                    title={item.name}
                    subtitle={
                        <Box>
                            <Typography variant="body2" fontWeight="bold">
                                {item.price} ₪
                            </Typography>
                            <Typography variant="caption" display="block">
                                Good for {item.capacity} people
                            </Typography>
                            <Typography variant="caption" display="block">
                                {item.weight} | {item.dimensions}
                            </Typography>
                        </Box>
                    }
                    position="below"
                />
            </ImageListItem>
        ))}
    </ImageList>
);
}

export default ShapeTab