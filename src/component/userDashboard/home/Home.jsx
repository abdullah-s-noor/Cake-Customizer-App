import React, { useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// Use direct paths since these are in public/
const Logo = "/image/da.png";
const Make = "/image/makecake.png";

// Mock data
const mockCakes = [
  { title: "Forever Bliss", flavor: "Bastashio", weight: "400 ml", img: Logo },
  { title: "Pure Romance", flavor: "Vanilla", weight: "140 ml", img: Logo },
  { title: "Elegant Charm", flavor: "Chocolate", weight: "120 ml", img: Logo },
  { title: "Dreamy Delight", flavor: "Fruits", weight: "180 ml", img: Logo },
  { title: "Sweet Harmony", flavor: "Red Velvet", weight: "200 ml", img: Logo },
  { title: "Golden Love", flavor: "Lemon", weight: "300 ml", img: Logo },
  { title: "Snow Kiss", flavor: "White Chocolate", weight: "250 ml", img: Logo },
  // Repeating for scroll testing
  { title: "Forever Bliss", flavor: "Bastashio", weight: "400 ml", img: Logo },
  { title: "Pure Romance", flavor: "Vanilla", weight: "140 ml", img: Logo },
  { title: "Elegant Charm", flavor: "Chocolate", weight: "120 ml", img: Logo },
  { title: "Dreamy Delight", flavor: "Fruits", weight: "180 ml", img: Logo },
  { title: "Sweet Harmony", flavor: "Red Velvet", weight: "200 ml", img: Logo },
  { title: "Golden Love", flavor: "Lemon", weight: "300 ml", img: Logo },
  { title: "Snow Kiss", flavor: "White Chocolate", weight: "250 ml", img: Logo },
];

const girlCakes = [
  { title: "Pini Ribbons", flavor: "Bastashio", weight: "40 ml", img: Logo },
  { title: "Queen", flavor: "Vanilla", weight: "50 ml", img: Logo },
  { title: "Butterflies", flavor: "Chocolate", weight: "60 ml", img: Logo },
  { title: "Pink Hearts", flavor: "Fruits", weight: "50 ml", img: Logo },
  { title: "Ballerina", flavor: "Red Velvet", weight: "50 ml", img: Logo },
  // Repeating for scroll testing
  { title: "Pini Ribbons", flavor: "Bastashio", weight: "40 ml", img: Logo },
  { title: "Queen", flavor: "Vanilla", weight: "50 ml", img: Logo },
  { title: "Butterflies", flavor: "Chocolate", weight: "60 ml", img: Logo },
  { title: "Pink Hearts", flavor: "Fruits", weight: "50 ml", img: Logo },
  { title: "Ballerina", flavor: "Red Velvet", weight: "50 ml", img: Logo },
];

// Cake Card
const CakeCard = ({ cake }) => (
  <Card
    sx={{
      width: { xs: 120, sm: 150, md: 170, lg: 190 },
      flexShrink: 0,
      mx: 1,
      boxShadow: 3,
      borderRadius: 2,
    }}
  >
    <CardMedia component="img" height="170" image={cake.img} alt={cake.title} />
    <CardContent>
      <Typography fontWeight="bold" fontSize="14px">
        {cake.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {cake.flavor} • {cake.weight}
      </Typography>
    </CardContent>
  </Card>
);
// Carousel Component
const CakeCarousel = ({ title, cakes }) => {
  // @ts-ignore
  const scrollRef = useRef();

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector("div > div"); // gets one CakeCard wrapper
    if (!card) return;

    const cardWidth = card.offsetWidth + 16; // get actual card width + margin (mx: 1 = 8px each side)
    const scrollAmount = cardWidth * 2; // scroll 6 cards at a time

    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Box mt={6}>
      <Typography
        variant="h6"
        ml={6}
        mb={2}
        sx={{ fontSize: { xs: "13px", md: "20px" } }}
      >
        {title}
      </Typography>
      <Box  position="relative" display="flex" alignItems="center">
        {/* Left Arrow */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>

        {/* Scrollable Container */}
        <Box
          paddingBottom="3px"
          ref={scrollRef}
          display="flex"
          overflow="hidden"
          justifyContent="space-between"
        >
          {cakes.map((cake, index) => (
            <CakeCard key={index} cake={cake} />
          ))}
        </Box>

        {/* Right Arrow */}
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};


// Home Page
export default function Home() {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Banner */}
      <Box
        sx={{
          width: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
          height: "auto",
          margin: "0 auto",
          display: "block",
          cursor: "pointer",
        }}
      >
        <img
          src={Make}
          alt="Banner"
          style={{
            marginTop: "30px",
            width: "100%",
          }}
          onClick={() => navigate("/custom-cake")}
        />
      </Box>

      {/* Carousels */}
      <CakeCarousel  title="Wedding Vibes Collection" cakes={mockCakes} />
      <CakeCarousel title="Girl Vibes Collection" cakes={girlCakes} />
    </Box>
  );
}
