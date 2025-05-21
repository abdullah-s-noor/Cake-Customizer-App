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
import { CheckCircleOutline } from '@mui/icons-material';
import axios from 'axios';

const FlavorTab = ({ onSelect, shape, selectedId, onSelectId }) => {
    const [flavors, setFlavors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //shape: the shape that was selected in the previous tab
    //onSelectId: function to set selected flavor id to save the flavor that you clicked on
    //selectedId: the id of the flavor that was selected we wan this because when you swap between tabs the flover that was selected will be saved
    //onSelect: to save the appropriate flavor that was get from shape id and flavor id

    const fetchFlavors = async () => {
        try {
            const res = await axios.get('/data/flavors.json');
            setFlavors(res.data.items);
        } catch (err) {
            console.error('Failed to load flavors', err);
            setError('Unable to load flavors. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getFlavorForShape = async (flavor) => {
        try {
            // const res = await axios.get(`/api/flavor-by-shape?shapeId=${shape._id}&flavorId=${flavor._id}`);
            const res = await axios.get('/data/selectedFlavor.json'); // mock
            const matched = res.data.items[0];
            onSelect?.(matched);
        } catch (err) {
            console.error('Failed to fetch flavor by shape', err);
        }
    };

    useEffect(() => {
        fetchFlavors();
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
            {flavors.map((flavor) => (
                <ImageListItem
                    key={flavor._id}
                    onClick={() => {
                        onSelectId(flavor._id);
                        getFlavorForShape(flavor);
                    }}
                    sx={{
                        cursor: 'pointer',
                        bgcolor: selectedId === flavor._id ? '#e3f2fd' : 'transparent',
                        borderRadius: 2,
                        transition: '0.2s',
                        position: 'relative',
                    }}
                >
                    {selectedId === flavor._id && (
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
                        srcSet={`${flavor.image.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${flavor.image.secure_url}?w=248&fit=crop&auto=format`}
                        alt={flavor.name}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        sx={{ textAlign: 'center' }}
                        title={flavor.name}
                        subtitle={
                            <Box>
                                <Typography variant="body2" fontWeight="bold">
                                    {flavor.price > 0 ? `+${flavor.price} ₪` : 'Free'}
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

export default FlavorTab;
