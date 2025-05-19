import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Rating,
} from "@mui/material";
import {toast} from "react-toastify";

export default function ReviewModal({ open, onClose }) {
  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: "",
    
  });

  const handleChange = (field, value) => {
    setReviewData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!reviewData.review) {
      toast.error("Please fill in all fields");
      return;
    }

    console.log("Review submitted:", reviewData);
    toast.success("Review submitted successfully!");
    setReviewData({
        rating: 0,
        review: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight="bold">Add Review</DialogTitle>

      <DialogContent>
        <Typography mb={1}>Your review about this product:</Typography>
        <Rating
          name="rating"
          precision={0.5}
          value={reviewData.rating}
          onChange={(e, newValue) => handleChange("rating", newValue)}
        />

        <Box mt={2}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Review *"
            value={reviewData.review}
            onChange={(e) => handleChange("review", e.target.value)}
            margin="dense"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ fontWeight: "bold" }}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}
