import React, { useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./homePageStyle.css"; // Assuming you have a CSS file for styles
// Use direct paths since these are in public/
const Logo = "/image/da.png";
const Make = "/image/makecake.png";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

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
  { title: "Butterflies", flavor: "Chocolateae0d5e", weight: "60 ml", img: Logo },
  { title: "Pink Hearts", flavor: "Fruits", weight: "50 ml", img: Logo },
  { title: "Ballerina", flavor: "Red Velvet", weight: "50 ml", img: Logo },
];

// Cake Card
const CakeCard = ({ cake }) => (
  <Card
    sx={{
      
      width: { xs: 120, sm: 150, md: 170, lg: 290 },
      flexShrink: 0,  
      background: "white",
      //border: "solid 1px #723d46",
      mx: 1,
     // boxShadow: 3,
      borderRadius: 2,
    }}
  >
    <CardMedia component="img" sx={{ height: { xs: 170, md: 230, lg: 270 } }} image={cake.img} alt={cake.title} />
    <CardContent>
      <Typography fontWeight="bold" fontSize="14px" >
        {cake.title}
      </Typography>
      <Typography variant="body2">
        {cake.flavor} • {cake.weight}
      </Typography>
    </CardContent>
  </Card>
);
// Carousel Component
import { useOutletContext } from "react-router-dom";

const CakeCarousel = ({ title, cakes }) => {

  // @ts-ignore
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
    <Box mt={6} className="middle" >
      <Typography
        variant="h6"
       // ml={6}
        //mb={2}
        sx={{ 
          fontSize: { xs: "13px", md: "25px" }, 
          textAlign: "center",
          width: '100%',
          color: 'black'
         }}
      >
        {title}
      </Typography>
      <Box position="relative" display="flex" alignItems="center" width="100%">
        {/* Left Arrow */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { 
              bgcolor: "#f5f5f5", 
            },
          }}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>

        {/* Scrollable Container */}
        <Box
        className="cake-carousel-container"
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
          // width: { xs: "100%", sm: "80%", md: "70%", lg: "60%" },
          height: "auto",
          margin: "0 auto",
          display: "block",
          cursor: "pointer",
        }}
      >
        <div className="home-page-wallpaper">
          <Typography variant="h1"
            sx={{ fontSize: { xs: "50px", md: "70px", lg: '80px' }, color: "white", fontWeight: "bold" }}
          >
            Bimi Cake
          </Typography>
          <Typography variant="h2"
            sx={{ fontSize: { xs: "18px", md: "20px", lg: '30px' }, color: "white", mt: 2 }}
          >
            Delicious Cakes Made to Order
          </Typography>
          <Typography variant="h2"
            sx={{ fontSize: { xs: "18px", md: "20px", lg: '30px' }, color: "white", mt: 2 }}
          >
            Fresh, Beautiful, and Baked with Love!
          </Typography>

          <Button variant="contained"
            onClick={() => navigate('/custom-cake', { state: { fromHome: true } })}
            endIcon={<ArrowOutwardIcon />}
            size="large"
            sx={{
              textTransform: 'none',
              bgcolor: '#723d46',
              color: 'white',
              mt: 3,
              fontSize: { xs: '14px', md: '16px' },
              borderRadius: 0,
              '&:hover': {
                bgcolor: '#8e4c57',
              }
            }}
          >
            Customize your cake
          </Button>
        </div>

      </Box>

      {/* Carousels */}
      <CakeCarousel title="Wedding Vibes Collection" cakes={mockCakes} />
      <CakeCarousel title="Girl Vibes Collection" cakes={girlCakes} />
    </Box>
  );
}
