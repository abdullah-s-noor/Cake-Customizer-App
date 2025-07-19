import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  Divider,
  Button,
} from "@mui/material";
import { api } from "../../../api/api.js";
import { toast } from "react-toastify";
import CakePreview from "../../userDashboard/customCake/CakePreview.jsx";
import { UserContext } from "../../context/User.jsx";

const AddNewCake = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [flavors, setFlavors] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [value, setValue] = useState(0);
  const {userInfo} =useContext(UserContext)
  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const { data } = await api.get("/custom/shapes/options");
        setShapes(data?.shapes || []);
      } catch {
        toast.error("Failed to load shapes");
      }
    };
    fetchShapes();
  }, []);

  const handleShapeSelect = (shapeId) => {
    const shape = shapes.find((s) => s._id === shapeId);
    if (!shape) return;
    setValue(0);
    setSelectedShape(shape);
    setFlavors(shape.flavors || []);
    setToppings(shape.toppings || []);
    setSelectedFlavor(null);
    setSelectedTopping(null);
  };

  const handleFlavorSelect = (flavorId) => {
    const flavor = flavors.find((f) => f._id === flavorId);
    setSelectedFlavor(flavor || null);
    setValue(1);
  };

  const handleToppingSelect = (toppingId) => {
    const topping = toppings.find((t) => t._id === toppingId);
    setSelectedTopping(topping || null);
    setValue(3);
  };
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  const handleSubmit = async () => {
    if (!selectedShape || !selectedFlavor || !selectedTopping) return;
    const orderDetails = {
      shape: selectedShape,
      flavor: selectedFlavor,
      topping: selectedTopping,
      color: selectedColor,
    };
    const [x, y, width, height] = orderDetails.shape.viewBox.split(' ').map(Number);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    try {
      // 1. Draw shape base
      const shapeImg = await loadImage(orderDetails.shape.image.secure_url);
      ctx.drawImage(shapeImg, 0, 0, width, height);

      // 2. Draw color if provided
      if (orderDetails.color && orderDetails.shape.d) {
        const path = new Path2D(orderDetails.shape.d);

        ctx.save();
        ctx.clip(path); // only color inside shape
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = orderDetails.color;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();

        ctx.globalCompositeOperation = 'source-over';
      } else if (orderDetails.flavor?.image?.secure_url) {
        // 3. If no color, draw flavor
        const flavorImg = await loadImage(orderDetails.flavor.image.secure_url);
        ctx.drawImage(flavorImg, 0, 0, width, height);
      }

      // 4. Draw topping if exists
      if (orderDetails.topping?.image?.secure_url) {
        const toppingImg = await loadImage(orderDetails.topping.image.secure_url);
        ctx.drawImage(toppingImg, 0, 0, width, height);
      }

      // 5. Convert to blob and submit
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      if (blob) {
        const file = new File([blob], 'custom-cake.png', { type: 'image/png' });
        const formData = new FormData();
        formData.append('shape', orderDetails.shape._id);
        formData.append('flavor', orderDetails.flavor._id);
        formData.append('topping', orderDetails.topping._id);
        formData.append('color', orderDetails.color);
        formData.append('cakeMessage', '');
        formData.append('instructions', '');
        formData.append('basecake', file);
        // Open the generated file in a new window

        formData.append('type', 'system');
        const { data } = await api.post('/cake/custom/new', formData);
        const fileURL = window.URL.createObjectURL(file);
        window.open(fileURL, '_blank');
      }
    } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error("Failed to add cake to cart.");
  }

};
const formatName = (name) =>
  name.includes("_") ? name.split("_")[1] : name;

const isReadyToSubmit =
  selectedShape && selectedFlavor && selectedTopping;

return (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" mb={4} fontWeight="bold">
      🎂 Add a New Custom Cake
    </Typography>

    <Grid container spacing={4}>
      {/* FORM SECTION */}
      <Grid item xs={12} md={6}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Shape */}
          <FormControl sx={{ width: 250 }}>
            <InputLabel id="shape-label">Shape</InputLabel>
            <Select
              labelId="shape-label"
              value={selectedShape?._id || ""}
              onChange={(e) => handleShapeSelect(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {shapes.map((shape) => (
                <MenuItem key={shape._id} value={shape._id}>
                  {shape.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Flavor */}
          {flavors.length > 0 && (
            <FormControl sx={{ width: 250 }}>
              <InputLabel id="flavor-label">Flavor</InputLabel>
              <Select
                labelId="flavor-label"
                value={selectedFlavor?._id || ""}
                onChange={(e) => handleFlavorSelect(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                {flavors.map((flavor) => (
                  <MenuItem key={flavor._id} value={flavor._id}>
                    {formatName(flavor.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Topping */}
          {toppings.length > 0 && (
            <FormControl sx={{ width: 250 }}>
              <InputLabel id="topping-label">Topping</InputLabel>
              <Select
                labelId="topping-label"
                value={selectedTopping?._id || ""}
                onChange={(e) => handleToppingSelect(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                {toppings.map((topping) => (
                  <MenuItem key={topping._id} value={topping._id}>
                    {formatName(topping.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Color */}
          {selectedShape && (
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Color
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <input
                  type="color"
                  value={selectedColor || "#ffffff"}
                  onChange={(e) => {
                    setSelectedColor(e.target.value);
                    setValue(2);
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    border: "none",
                    cursor: "pointer",
                  }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSelectedColor('');
                    setValue(2);
                  }}
                >
                  None Color
                </Button>
              </Box>
            </Box>
          )}

          {/* Submit Button */}
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!isReadyToSubmit}
            >
              Submit Cake
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* PREVIEW SECTION */}
      {selectedShape && (
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Cake Preview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <CakePreview
              selectedShape={selectedShape}
              selectedFlavor={selectedFlavor}
              selectedTopping={selectedTopping}
              selectedColor={selectedColor}
              value={value}
            />
          </Card>
        </Grid>
      )}
    </Grid>
  </Box>
);
};

export default AddNewCake;
