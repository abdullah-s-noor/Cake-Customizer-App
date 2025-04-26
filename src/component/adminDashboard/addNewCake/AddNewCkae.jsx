import React from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import CakeIcon from "@mui/icons-material/Cake";
import CollectionsIcon from "@mui/icons-material/Collections";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IcecreamIcon from "@mui/icons-material/Icecream";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

export default function AddNewCake() {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  return (
    <Box
      maxWidth={500}
      mx="auto"
      mt={5}
      p={3}
      textAlign="center"
      sx={{ fontFamily: "Arial, sans-serif" }}
    >
      {/* Title */}
      <Typography variant="h6" fontWeight="bold" mb={1} color="#E0BFBF">
        Add New Cake{" "}
        <CakeIcon
          fontSize="small"
          sx={{ verticalAlign: "middle", marginBottom: 1 }}
        />
      </Typography>

      {/* Upload Section */}
      <Typography variant="subtitle2" fontWeight="bold" color="#E0BFBF" mb={1}>
        Add Image
      </Typography>
      <Box
        component="label"
        htmlFor="upload-button"
        border="1px dashed #E0BFBF"
        borderRadius={2}
        mb={3}
        sx={{
          cursor: "pointer",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "80%", md: "100%" },
          height: 250,
          mb: 7,
        }}
      >
        {selectedImage ? (
          <Box
            component="img"
            src={selectedImage}
            alt="Cake Preview"
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <AddPhotoAlternateOutlinedIcon
            sx={{ fontSize: 32, color: "#E0BFBF" }}
          />
        )}
        <input
          type="file"
          id="upload-button"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Box>

      {/* Form Fields */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="Cake Name"
            // label="Cake Name"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EditOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="Collections"
            // label="Collections"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CollectionsIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="Cake Filling"
            // label="Cake Filling"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IcecreamIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="Topping"
            // label="Topping"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CakeIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="Price"
            // label="Price"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            placeholder="Discount"
            // label="Discount"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PercentIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box mt={4}>
        <Button
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(to right, #f7e4e4, #e0bfbf)",
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
            textTransform: "none",
            borderRadius: 2,
            py: 1.5,
          }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}