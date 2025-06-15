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
import { Clear, Close } from '@mui/icons-material';
import CakePreview from '../customCake/CakePreview'; // Adjust path as needed

export default function ShapePreviewArea({ file, shapeData }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (!file || !shapeData?.d || !shapeData?.viewBox) {
      setOpenDialog(false);
    }
  }, [file, shapeData]);

  return (
    <Box mt={3} textAlign="center">
      {!openDialog && file && shapeData?.d && shapeData?.viewBox && (
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

      {/* Dialog for Preview */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Cake Preview</Typography>
          <IconButton onClick={() => setOpenDialog(false)} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {/* Color Picker */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
            sx={{ gap: 2 }}
          >
            <Clear
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                border: selectedColor === '' ? '3px solid #723d46' : '1px solid #ccc',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedColor('')}
            />

            <Box
              onClick={() => setSelectedColor('green')}
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                bgcolor: 'green',
                border: selectedColor === 'green' ? '3px solid #723d46' : '1px solid #ccc',
                cursor: 'pointer',
              }}
            />
          </Box>

          {/* Cake Preview */}
          <Box mt={2}>
            <CakePreview
              selectedShape={shapeData}
              selectedFlavor={null}
              selectedTopping={null}
              selectedColor={selectedColor}
              value={3}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
