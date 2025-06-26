import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";
import { api } from "../../../api/api.js";
import { toast } from "react-toastify";

const AddNewCake = () => {
  const [shapes, setShapes] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedTopping, setSelectedTopping] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff");

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

  const handleShapeSelect = (id) => {
    const shape = shapes.find((s) => s._id === id);
    setSelectedShape(shape);
    setSelectedFlavor("");
    setSelectedTopping("");
    setFlavors(shape.flavors || []);
    setToppings(shape.toppings || []);
  };

  const formatName = (name) => {
    const idx = name.indexOf("_");
    return idx !== -1 ? name.slice(idx + 1) : name;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4}>
        Add New Cake
      </Typography>

      <Grid
        container
        spacing={4}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* Left: Inputs */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {/* Shape */}
          <FormControl fullWidth margin="normal" sx={{ width: 200 }}>
            <InputLabel sx={{ fontSize: "1.2rem" }} id="shape-label">
              Shape
            </InputLabel>
            <Select
              value={selectedShape?._id || ""}
              label="Shape"
              onChange={(e) => handleShapeSelect(e.target.value)}
              sx={{ fontSize: "1.1rem", minHeight: 56 }}
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
          {selectedShape && flavors.length > 0 && (
            <FormControl fullWidth margin="normal" sx={{ width: 200 }}>
              <InputLabel sx={{ fontSize: "1.2rem" }} id="flavor-label">
                Flavor
              </InputLabel>
              <Select
                value={selectedFlavor}
                label="Flavor"
                onChange={(e) => setSelectedFlavor(e.target.value)}
                sx={{ fontSize: "1.1rem", minHeight: 56 }}
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
          {selectedShape && toppings.length > 0 && (
            <FormControl fullWidth margin="normal" sx={{ width: 200 }}>
              <InputLabel sx={{ fontSize: "1.2rem" }} id="topping-label">
                Topping
              </InputLabel>
              <Select
                value={selectedTopping}
                label="Topping"
                onChange={(e) => setSelectedTopping(e.target.value)}
                sx={{ fontSize: "1.1rem", minHeight: 56 }}
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

          {/* Color Picker */}
          {selectedShape&& (
          <Box mt={2} mb={2}>
            <Typography variant="body1" mb={1}>
              Color
            </Typography>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{
                width: 48,
                height: 48,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            />
          </Box>
            )}
        </Grid>

        {/* Right: Preview */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cake Preview
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <CardContent>
              <Box
                position="relative"
                width="250px"
                height="250px"
                mx="auto"
                mb={2}
              >
                {/* SVG Shape with color fill */}
                {selectedShape?.d && selectedShape?.viewBox && (
                  <svg
                    width="100%"
                    height="100%"
                    viewBox={selectedShape.viewBox}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 2,
                    }}
                  >
                    <path d={selectedShape.d} fill={selectedColor} />
                  </svg>
                )}

                {/* Flavor Image */}
                {selectedFlavor && (
                  <CardMedia
                    component="img"
                    image={
                      flavors.find((f) => f._id === selectedFlavor)?.image
                        ?.secure_url
                    }
                    alt="Flavor"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      zIndex: 1,
                    }}
                  />
                )}

                {/* Topping Image */}
                {selectedTopping && (
                  <CardMedia
                    component="img"
                    image={
                      toppings.find((t) => t._id === selectedTopping)?.image
                        ?.secure_url
                    }
                    alt="Topping"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      zIndex: 3,
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddNewCake;