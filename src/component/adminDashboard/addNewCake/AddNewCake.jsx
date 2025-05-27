import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import CollectionsIcon from "@mui/icons-material/Collections";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IcecreamIcon from "@mui/icons-material/Icecream";
import BrushTwoToneIcon from "@mui/icons-material/BrushTwoTone";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { toast } from "react-toastify";
import Conformation from "../../Conformation/Conformation";
import { api } from "../../../api/api";

export default function AddNewCake() {
  document.title = "Add New Cake";
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [cakeData, setCakeData] = useState({
    name: "",
    collection: "",
    shape: "",
    flavour: "",
    topping: "",
    color: "",
    image: null,
  });

  const handleChange = (e) => {
    setCakeData({ ...cakeData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCakeData((prev) => ({ ...prev, image: file }));
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleConfirm = () => {
    for(const key in cakeData){
      if(!cakeData[key]){
        toast.error(`Please fill in all fields`);
        return;
      }
    }
    setOpen(true); // Show confirmation dialog
  };

  const handleButton = async () => {
    try {
      const formData = new FormData();
      Object.entries(cakeData).forEach(([key, value]) => {
        if (key === "image" && !value) return;
        formData.append(key, value);
      });

      const resp = await api.post("/cake", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCakeData(resp.data);

      toast.success("Cake added successfully!");
      setCakeData({
        name: "",
        collection: "",
        shape: "",
        flavour: "",
        topping: "",
        color: "",
        image: null,
      });
      setSelectedImage(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      setOpen(false); // Close confirmation dialog
    }
  };

  return (
    <>
      <Conformation
        open={open}
        title="Add New Cake"
        description="Are you sure you want to add this cake?"
        onClose={() => setOpen(false)}
        onConfirm={handleButton}
      />
      <Box
        maxWidth={500}
        mx="auto"
        mt={5}
        p={3}
        textAlign="center"
        sx={{ fontFamily: "Arial, sans-serif" }}
      >
        <Typography variant="h6" fontWeight="bold" mb={1} color="#723d46">
          Add New Cake <CakeIcon fontSize="small" sx={{ mb: 0.5 }} />
        </Typography>

        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="#723d46"
          mb={1}
        >
          Add Image
        </Typography>

        <Box
          component="label"
          htmlFor="upload-button"
          border="1px dashed #723d46"
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
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          ) : (
            <AddPhotoAlternateOutlinedIcon
              sx={{ fontSize: 32, color: "#723d46" }}
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name"
              placeholder="Cake Name"
              value={cakeData.name}
              onChange={handleChange}
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
              name="collection"
              placeholder="Collections"
              value={cakeData.collection}
              onChange={handleChange}
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
              name="shape"
              placeholder="Shape"
              value={cakeData.shape}
              onChange={handleChange}
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
              name="flavour"
              placeholder="Flavour"
              value={cakeData.flavour}
              onChange={handleChange}
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
              name="topping"
              placeholder="Topping"
              value={cakeData.topping}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BrushTwoToneIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="color"
              placeholder="Color"
              value={cakeData.color}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ColorLensIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Button
            onClick={handleConfirm}
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              background: "linear-gradient(to right, #723d46, #723d46)",
              color: "white",
              fontWeight: "bold",
              fontSize: 22,
              textTransform: "none",
              borderRadius: 2,
              py: 1.5,
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Add"
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
}
