import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import { api } from "../../../api/api.js";
import Theme from "../../../../src/theme.js";

export default function ReviewModal({
  open,
  onClose,
  cakeId,
  onReviewAdded,
  reviewToEdit,
}) {
  const [reviewData, setReviewData] = useState({
    rating: reviewToEdit?.rating || 0,
    comment: reviewToEdit?.comment || "",
  });
  const navigate = useNavigate()
  useEffect(() => {
    if (reviewToEdit) {

      setReviewData({
        rating: reviewToEdit.rating,
        comment: reviewToEdit.comment,
      });
    } else {
      setReviewData({ rating: 0, comment: "" });
    }
  }, [reviewToEdit, open]);
  
  
  const submitReview = async () => {
    if (!cakeId) {
      toast.error("Please select a cake");
      return;
    }
    if (!reviewData.comment || !reviewData.rating) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      let response;
      if (reviewToEdit) {
        response = await api.put("/rate/update", {
          id: reviewToEdit._id,
          rating: reviewData.rating,
          comment: reviewData.comment,
        });
        await navigate(0);
      } else {
        response = await api.post("/rate/add/", {
          cakeId,
          ...reviewData,
        });
        navigate(0)
      }

      toast.success("Review submitted successfully!");
      setReviewData({ rating: 0, comment: "" });
      if (onReviewAdded && response?.data?.review) {
        onReviewAdded(response?.data?.review);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
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
          precision={1}
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
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: Theme.palette.primary.main,
            border: "#723d46 1px solid",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={submitReview}
          variant="contained"
          sx={{ fontWeight: "bold", bgcolor: Theme.palette.primary.main }}
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}
