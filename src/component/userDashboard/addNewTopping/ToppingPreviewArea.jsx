import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';
import CakePreview from '../customCake/CakePreview'; 

export default function ToppingPreviewArea({ file, toppingData, selectedShape }) {
  const [openDialog, setOpenDialog] = useState(false);

  // Close dialog if any essential prop is missing
  useEffect(() => {
    if (!file || !selectedShape || !toppingData) {
      setOpenDialog(false);
    }
  }, [file, selectedShape, toppingData]);

  return (
    <Box mt={3} textAlign="center">
      {/* Show Preview Button only when all data is available */}
      {!openDialog && file && selectedShape && toppingData && (
        <Button
          variant="outlined"
          fullWidth
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setOpenDialog(true)}
        >
          Preview Cake
        </Button>
      )}

      {/* Dialog for Cake Preview */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" component="span">Cake Preview</Typography>
          <IconButton onClick={() => setOpenDialog(false)} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box mt={2}>
            <CakePreview
              selectedShape={selectedShape}
              selectedFlavor={null}
              selectedTopping={toppingData}
              selectedColor={''}
              value={3}
              b={0}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
