import React, { useEffect, useState } from 'react';
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Box,
    Typography,
    Chip,
    Alert,
    CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { CheckCircleOutline } from '@mui/icons-material';

const ShapeTab = ({ onSelect, selectedId, onSelectId }) => {
    const [shapes, setShapes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchShapes = async () => {
        try {
            const res = await axios.get('/data/shapes.json');
            setShapes(res.data.items);
        } catch (err) {
            console.error("Failed to load shapes", err);
            setError('Unable to load shapes. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShapes();
    }, []);

    if (loading) return <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error">{error}</Alert>;

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
                    onClick={() => {
                        onSelect?.(item);       // Pass shape object
                        onSelectId?.(item._id); // Save selected shape id
                    }}
                    sx={{
                        cursor: 'pointer',
                        bgcolor: selectedId === item._id ? '#e3f2fd' : 'transparent',
                        borderRadius: 2,
                        transition: '0.2s',
                        position: 'relative',
                    }}
                >
                    {selectedId === item._id && (
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
                                {item.mostPopular && (
                                    <Chip
                                        label="★ Most Popular"
                                        size="small"
                                        sx={{
                                            mt: 0.5,
                                            bgcolor: '#d63384',
                                            color: '#fff',
                                            fontSize: '0.65rem',
                                        }}
                                    />
                                )}
                            </Box>
                        }
                        position="below"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
};

export default ShapeTab;
