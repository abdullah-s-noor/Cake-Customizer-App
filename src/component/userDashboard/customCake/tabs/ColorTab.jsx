import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Clear, Colorize } from '@mui/icons-material';
import theme from '../../../../theme'
const predefinedColors = [
    '#ffeb3b', '#ff9800', '#f44336',
    '#f8bbd0', '#e91e63', '#4caf50',
    '#81c784', '#03a9f4', '#0d47a1',
    '#fbe9e7', '#ffe0b2', '#5d4037',
    , ''
];

const ColorTab = ({ setSelectedColor, selectedColor, navHeight, heightPreview }) => {
    const [customColor, setCustomColor] = useState(null);

    const handleCustomColorChange = (e) => {
        setCustomColor(e.target.value);
        setSelectedColor?.(e.target.value);
    };

    return (
        <Box sx={{
            display: 'grid',
            
            
            gridTemplateColumns: 'repeat(auto-fill, 50px)',
            gap: 6,
            justifyContent: 'center',
            alignContent: 'start',
            height: {
                    xs: `calc(100vh - ${heightPreview.xs + navHeight.xs}px)`,
                    md: `calc(100vh - ${navHeight.md}px)`
                },
            overflowY: 'auto',
            p:2,
            pb: 7,
            
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
                backgroundColor: theme.palette.primary.main,
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
                color === '' ? <Clear sx={{ width: 50, height: 50, }}
                    key={index}
                    onClick={() => setSelectedColor?.(color)} /> : ( // Skip empty color
                    <Box

                        key={index}
                        onClick={() => setSelectedColor?.(color)}
                        sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            bgcolor: color,
                            border: selectedColor === color ? '3px solid #723d46' : '1px solid #ccc',
                            cursor: 'pointer',

                        }}
                    />
                )
            ))}
        </Box>
    );
};

export default ColorTab;
