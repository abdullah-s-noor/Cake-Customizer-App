import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function InstructionAccordion({ value, onChange }) {
  return (
    <Accordion
      defaultExpanded
      sx={{
        bgcolor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: 'none',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="extra-instructions-content"
        id="extra-instructions-header"
      >
        <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
          Additional Instructions
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          multiline
          minRows={3}
          placeholder="Add any extra notes here..."
          value={value}
          onChange={onChange}
          sx={{ mt: 1 }}
        />
      </AccordionDetails>
    </Accordion>
  );
}
