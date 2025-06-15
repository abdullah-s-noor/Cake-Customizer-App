import React, { useEffect, useState } from 'react';
import { TextField, CircularProgress, Autocomplete } from '@mui/material';
import axios from 'axios';
import {api} from '../api/api'
export default function ShapeSelector({ onSelect, selectedShape }) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setLoading(true);
            api.get('/custom/shape')
                .then(res => {
                    setOptions(res.data?.items || []);
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
            value={selectedShape}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(e, newValue) => onSelect(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Shape"
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
