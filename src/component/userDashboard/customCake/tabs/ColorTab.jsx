import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Colorize } from '@mui/icons-material';

const predefinedColors = [
    '#ffeb3b', '#ff9800', '#f44336',
    '#f8bbd0', '#e91e63', '#4caf50',
    '#81c784', '#03a9f4', '#0d47a1',
    '#fbe9e7', '#ffe0b2', '#5d4037'
];

const ColorTab = ({ onSelect, selectedColor }) => {
    const [customColor, setCustomColor] = useState(null);

    const handleCustomColorChange = (e) => {
        setCustomColor(e.target.value);
        onSelect?.(e.target.value);
    };

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 60px)',
            gap: 6,
            justifyContent: 'center',
            alignContent: 'start',
            height: { xs: 360, sm: 500, md: 600 },
            overflowY: 'auto',
            p: 1,
            '&::-webkit-scrollbar': {
                width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '8px',
                backgroundColor: '#42a5f5',
            },
        }}>
            {/* Color Picker Button */}
            <Tooltip title="Pick custom color">
                <IconButton
                    component="label"
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: customColor || '#ccc',
                        border: '2px solid #8e24aa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Colorize />
                    <input
                        type="color"
                        hidden
                        onChange={handleCustomColorChange}
                    />
                </IconButton>
            </Tooltip>

            {/* Predefined Colors */}
            {predefinedColors.map((color, index) => (
                <Box
                    key={index}
                    onClick={() => onSelect?.(color)}
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: color,
                        border: selectedColor === color ? '3px solid #8e24aa' : '1px solid #ccc',
                        cursor: 'pointer',
                    }}
                />
            ))}
        </Box>
    );
};

export default ColorTab;
