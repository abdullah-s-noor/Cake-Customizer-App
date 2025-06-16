import React, { useEffect, useState } from 'react';
import { TextField, CircularProgress, Autocomplete } from '@mui/material';
import axios from 'axios';
import {api} from '../api/api'
export default function CollectionSelector({ onSelect, selectedCollection }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setLoading(true);
            api.get('/collections?page=1&limit=5')
                .then(res => {
                    setOptions(res.data?.collections || []);
                })
                .catch(() => {
                    setOptions([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            loading={loading}
            value={selectedCollection}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(e, newValue) => onSelect(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Collection"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}
