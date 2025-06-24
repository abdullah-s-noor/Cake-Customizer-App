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
const Logo = "/image/imageCakes/shapes/double barrel/flavors/Red Velvet.png";
const Make = "/image/makecake.png";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Theme from "../../../../src/theme.js";

// Mock data
const mockCakes = [
  { title: "Forever Bliss", flavor: "Bastashio", weight: "400 ml", img: "/image/testCake/1.png" },
  { title: "Pure Romance", flavor: "Vanilla", weight: "140 ml", img: "/image/testCake/2.png" },
  { title: "Elegant Charm", flavor: "Chocolate", weight: "120 ml", img: "/image/testCake/3.png" },
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

import { useOutletContext } from "react-router-dom";
import theme from "../../../../src/theme.js";



// Home Page
export default function Home() {
  const navigate = useNavigate();
  // Cake Card
  const CakeCard = ({ cake }) => (
    <Card
      sx={{

        width: { xs: 170, sm: 200, md: 220, lg: 300 },
        flexShrink: 0,
        background: 'white',
        //border: "solid 1px #723d46",
        mx: 1,
        // boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box display="flex" justifyContent={'center'} >
        {/* Show normal image */}
        <Box
          component="img"
          src={cake.img}
          alt={"Cake"}
          height={{ xs: 194.55, sm: 229.21, md: 252.33, lg: 344.75 }}
          sx={{
            width: { xs: '100%' },
            transform: "translateY(-10%)",
          }}
        />
      </Box>
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
            color: 'black',
          }}
        >
          {title}
        </Typography>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          width="100%"
          mb={1}
          pr={1}
        >
          <Button
            variant="text"
            endIcon={<ArrowOutwardIcon />}
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: { xs: '13px', md: '16px' },
              '&:hover': {
                color: theme.palette.secondary.main,
                background: 'transparent'
              }
            }}
            onClick={() => { navigate('/seeall') }}
          >
            See all
          </Button>
        </Box>
        <Box position="relative" display="flex" alignItems="center" width="100%">
          {/* Left Arrow */}
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              bgcolor: "white",
              boxShadow: 2,
              "&:hover": {
                bgcolor: theme.palette.secondary.main
                ,
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
            sx={{
              gap: { xs: '0px', sm: '18px' }
            }}
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
              "&:hover": {
                bgcolor: theme.palette.secondary.main,
              },
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box >
    );
  };
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
              bgcolor: Theme.palette.primary.main,
              color: 'white',
              mt: 3,
              fontSize: { xs: '14px', md: '16px' },
              borderRadius: 0,
              '&:hover': {
                bgcolor: theme.palette.secondary.main,
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
