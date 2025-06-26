import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { api } from '../../../api/api'; // Adjust the import path as needed

export default function AddCollectionDialog({ open, onClose, onSuccess }) {
    const [collectionName, setCollectionName] = useState('');
    const [collectionImage, setCollectionImage] = useState(null);
    
    const handleSubmit = async () => {
        if (!collectionName || !collectionImage) {
            toast.error('Please provide both collection name and image.');
            return;
        }

        const formData = new FormData();
        formData.append('name', collectionName);
        formData.append('image', collectionImage);

        try {
            const res = await api.post('/collections', formData);
            toast.success('Collection added successfully!');
            onSuccess && onSuccess(res.data); // Pass new collection back if needed
            handleClose();
        } catch (error) {
            console.error(error);
            toast.error('Failed to add collection.');
        }
    };

    const handleClose = () => {
        setCollectionName('');
        setCollectionImage(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Add New Collection
                <IconButton onClick={handleClose} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    label="Collection Name"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => setCollectionImage(e.target.files[0])}
                    />
                </Button>
                {collectionImage && (
                    <Typography variant="body2" mt={1}>
                        Selected Image: {collectionImage.name}
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add Collection</Button>
            </DialogActions>
        </Dialog>
    );
}
