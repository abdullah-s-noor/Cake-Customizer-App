import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import UploadFile from '../../../../pages/UploadFile';
import InstructionAccordion from '../../../../pages/Accordion';

function CollectionTab({ message, setMessage,file, setFile,instructions, setInstructions,handlePriceChange }) {
  return (
    <Box padding={2} display="flex" flexDirection="column" gap={2}>
      <Box position="relative" sx={{ bgcolor: '#f5f5f5', mb: 2 }}>
        <TextField
          label="Write on your cake"
          placeholder="Example: Happy Birthday"
          multiline
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          inputProps={{ maxLength: 40 }}
        />
        <Typography variant="caption" sx={{ position: 'absolute', left: 0, bottom: -24 }}>
          {message.length} / 40
        </Typography>
      </Box>

      <UploadFile
        file={file}
        onFileSelect={(f) => {
          setFile(f)
          handlePriceChange(0,4)
        }}
        onRemove={() => {
          setFile(null)
          handlePriceChange(0,-4)

        }}
      />

      <InstructionAccordion
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
    </Box>
  );
}

export default CollectionTab;
