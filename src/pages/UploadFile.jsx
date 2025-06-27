import React, { useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Delete, AddCircleOutline } from '@mui/icons-material';

function UploadFile({ file, onFileSelect, onRemove, text = '📷 Attach a photo for printing' }) {
  // @ts-ignore
  console
    .log(file)
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      onFileSelect(selected);
    }
  };
  const getImageSrc = (file) => {
    if (!file) return null;
    if (file instanceof File) return URL.createObjectURL(file);
    if (file.secure_url) return file.secure_url;
    return null;
  };

  return (
    <Box
      sx={{
        border: '2px dashed #bbb',
        borderRadius: 2,
        p: {xs:2,sm:4},
        textAlign: 'center',
        bgcolor: '#f5f5f5',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          borderColor: '#42a5f5',
        },
        position: 'relative',
      }}
      onClick={() => {
        if (!file) inputRef.current.click();
      }}
    >
      <input
        type="file"
        accept="image/*"
        hidden
        ref={inputRef}
        onChange={handleFileChange}
      />

      {!file ? (
        <>
          <IconButton size="large" disableRipple>
            <AddCircleOutline sx={{ fontSize: {xs:20,sm:40}, color: '#999' }} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </>
      ) : (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={getImageSrc(file)}
            alt="Uploaded"
            style={{ maxHeight: 100, borderRadius: 8 }}
          />
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering input click
              onRemove();
              inputRef.current.value = "";
            }}
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              bgcolor: '#fff',
              boxShadow: 1,
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default UploadFile;
