import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";
import Logo from "/image/testCake/1.png";
import Loader from "../../Loaders/Loader";



// ✅ Fake data simulating API response
const fakeMediaData = [
  {
    title: "التحليل الجيني",
    subtitle: "The Science",
    image: "/image/testCake/1.png",
    isNew: false,
  },
  {
    title: "العالم السفلي",
    subtitle: "Under World",
    image: "/image/testCake/2.png",
    isNew: false,
  },
  {
    title: "قارتنا",
    subtitle: "The Continents",
    image: "/image/testCake/3.png",
    isNew: false,
  },
  {
    title: "قائد المجد",
    subtitle: "efef",
    image: Logo,
    isNew: true,
  },
  {
    title: "العمال البريون",
    subtitle: "Wild Workers",
    image: Logo,
    isNew: false,
  },
  {
    title: "الجوية الأسوأ",
    subtitle: "World’s ",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
  {
    title: "الرحلات الجوية الأسوأ",
    subtitle: "World’s Worst Flights",
    image: Logo,
    isNew: false,
  },
];

// ✅ Simulated async API function
const fetchFakeMedia = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeMediaData);
    }, 1500); // 1.5 seconds delay to simulate loading
  });
};

const MediaGrid = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const data = await fetchFakeMedia();
        setMediaItems(data);
      } catch (error) {
        console.error("Error fetching fake media:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            px: { xs: 2, sm: 7, md: 10, lg: 20 },
            flexGrow: 1,
            minHeight: "100vh",
          }}
        >
          <Box display="flex" justifyContent="center" mt={5} mb={5}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                fontWeight: "bold",
                textAlign: "center",
                px: 4,
                py:2,
                borderRadius: 5,
                width: "fit-content",
              }}
            >
              wedding cakes
            </Typography>
          </Box>
          <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
            {mediaItems.map((item, index) => (
              <Grid item xs={6} md={4} lg={4} key={index}>
                <Card
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  {item.isNew && (
                    <Chip
                      label="جديد"
                      color="error"
                      size="small"
                      sx={{ position: "absolute", top: 8, left: 8, zIndex: 2 }}
                    />
                  )}
                  <Box display="flex" justifyContent={'center'} >
                    {/* Show normal image */}
                    <Box
                      component="img"
                      src={item.image}
                      alt={"Cake"}
                      sx={{
                        width: { xs: 129.82,sm:199.08,md:259.66,lg:285.63},
                        transform: "translateY(-10%)",
                        height: { xs: 150, sm: 230, md: 300, lg: 330 }
                      }}
                    />

                  </Box>

                  <CardContent
                  >

                    <Typography variant="body1" fontWeight="bold" >
                      {item.title}
                    </Typography>
                    {item.subtitle && (
                      <Typography variant="body2" color="gray">
                        {item.subtitle}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default MediaGrid;
