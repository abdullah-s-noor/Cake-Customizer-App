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
import { api } from "../../../api/api.js";

export default function ReviewModal({ open, onClose, cakeId  }) {
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
  });

  const submitReview = async () => {
    if (!reviewData.comment) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("cakeId", cakeId);
    for(const key in reviewData){
        formData.append(key, reviewData[key]);
    }

    try {
      const response = await api.post("/rate/add/",formData, 
        {
          headers: {
            "Content-Type": "form-data",
          },
        }
      );

      toast.success("Review submitted successfully!");
      return response.data; 
    }
     
     catch (error) {
      // Handle error (e.g., show error message)
      toast.error(error.message);
    }finally{
        onClose();
    }
  };

  const handleChange = (field, value) => {
    setReviewData((prev) => ({ ...prev, [field]: value }));
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
            name="comment"
            label="Comment *"
            value={reviewData.comment}
            onChange={(e) => handleChange("comment", e.target.value)}
            margin="dense"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={submitReview} variant="contained" sx={{ fontWeight: "bold" }}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}
