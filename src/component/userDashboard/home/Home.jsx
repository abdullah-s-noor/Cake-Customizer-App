import React, { useRef, useState, useEffect, useContext } from "react";
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
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { api } from "../../../api/api";
import { useOutletContext } from "react-router-dom";
import theme from "../../../../src/theme.js";
import { toast } from "react-toastify";
import { UserContext } from "../../context/User";
import Loader from "../../Loaders/Loader";



// Home Page
export default function Home() {
  const [favorites, setFavorites] = useState([]);
  const { userToken, userInfo,getUserCounts } = useContext(UserContext)
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        let favRes = { data: { favorite: { cakes: [] } } };
        if (userToken) {
          try{
            favRes=await api.get("/favorite")
          }catch(err){
            favRes = { data: { favorite: { cakes: [] } } }
          }
        }
        const colRes = await api.get("/collections/collections-with-cakes");
        
        const cakeIds = favRes.data.favorites?.cakes?.map(cake => cake._id) || [];
        setFavorites(cakeIds);
        setCollections(colRes.data.data || []);
      } catch (err) {
        toast.error("Error fetching home data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const navigate = useNavigate();
  // Cake Card
  const CakeCard = ({ cake }) => {
    const isFavorited = favorites.includes(cake.cakeId);
    const [isLoading, setIsLoading] = useState(false);

    const handleFavorite = async (cakeId, isFavorited) => {
      if (!userToken) {
        navigate('/login');
        return;
      }
      setIsLoading(true);
      const deploy = {
        userId: userInfo._id,
        cakeId,
      };
      try {
        if (isFavorited) {
          await api.post("/favorite/remove", deploy);
          await getUserCounts()
          setFavorites((prev) => prev.filter((id) => id !== cakeId));
        } else {
          await api.post("/favorite/add", deploy);
          await getUserCounts()
          setFavorites((prev) => [...prev, cakeId]);
        }
      } catch (err) {
        console.error("Error updating favorite:", err);
        toast.error("Could not update favorite.");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Card
        sx={{
          width: { xs: 170, sm: 200, md: 220, lg: 300 },
          flexShrink: 0,
          background: 'white',
          mx: 1,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent={'center'} position="relative">
          <Box
            bgcolor={'#fffcf4'}
            component="img"
            src={cake.image}
            alt={"Cake"}
            height={{ xs: 194.55, sm: 229.21, md: 252.33, lg: 344.75 }}
            sx={{
              width: '100%',
              transform: "translateY(-10%)",
            }}
            onClick={() => {
              navigate(`/cakeinformation/${cake.cakeId}`, {
                state: { from: 'home' }
              });
            }}
          />
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => handleFavorite(cake.cakeId, isFavorited)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  border: '2px solid #ccc',
                  borderTop: '2px solid red',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite',
                }}
              />
            ) : isFavorited ? (
              <Favorite color="error" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        </Box>
        <CardContent>
          <Typography fontWeight="bold" fontSize="14px">
            {cake.cake_name.split('_')[1]}
          </Typography>
          <Typography fontSize="13px" color="text.secondary" mt={0.5}>
            {cake?.price}₪
          </Typography>
        </CardContent>
      </Card>
    );
  };

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
      const scrollAmount = cardWidth * (window.innerWidth < theme.breakpoints.values.sm ? 1 : 2); // scroll 1 card on xs, 2 on sm+
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
    <>

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
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Loader />
          </Box>
        ) : (
          collections.map((collection, index) => (
            <CakeCarousel
              key={index}
              title={collection?.collectionName || "Collection"}
              cakes={collection?.cakes || []}
            />
          ))
        )}
      </Box>
    </>
  );
}
